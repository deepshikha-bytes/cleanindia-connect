const { app } = require("@azure/functions");
const { randomUUID } = require("crypto");
const { success, error } = require("../shared/apiResponse");
const { getReportsContainer } = require("../shared/cosmosClient");

const REPORT_LIMITS = {
  title: 100,
  description: 800,
  location: 150,
  citizenName: 60,
  ownerId: 120,
};

const COMMENT_LIMITS = {
  text: 250,
};

const ALLOWED_STATUSES = ["Pending", "In Progress", "Resolved"];

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isNotFoundError(exception) {
  return exception && (exception.code === 404 || exception.statusCode === 404);
}

async function readReportById(container, reportId) {
  const { resource } = await container.item(reportId, reportId).read();
  return resource;
}

function validateReportInput(reportData) {
  if (!reportData || typeof reportData !== "object") {
    return "Request body must be a valid report object.";
  }

  const title = cleanText(reportData.title);
  const description = cleanText(reportData.description);
  const location = cleanText(reportData.location);
  const type = cleanText(reportData.type);
  const urgency = cleanText(reportData.urgency);
  const citizenName = cleanText(reportData.citizenName);
  const ownerId = cleanText(reportData.ownerId);

  if (!title || !description || !location || !type || !urgency) {
    return "Title, description, location, type, and urgency are required.";
  }

  if (title.length > REPORT_LIMITS.title) {
    return `Title must be ${REPORT_LIMITS.title} characters or less.`;
  }

  if (description.length > REPORT_LIMITS.description) {
    return `Description must be ${REPORT_LIMITS.description} characters or less.`;
  }

  if (location.length > REPORT_LIMITS.location) {
    return `Location must be ${REPORT_LIMITS.location} characters or less.`;
  }

  if (citizenName.length > REPORT_LIMITS.citizenName) {
    return `Citizen name must be ${REPORT_LIMITS.citizenName} characters or less.`;
  }

  if (ownerId.length > REPORT_LIMITS.ownerId) {
    return `Owner ID must be ${REPORT_LIMITS.ownerId} characters or less.`;
  }

  return null;
}

function validateStatusInput(statusData) {
  if (!statusData || typeof statusData !== "object") {
    return "Request body must be a valid status object.";
  }

  const status = cleanText(statusData.status);

  if (!status) {
    return "Status is required.";
  }

  if (!ALLOWED_STATUSES.includes(status)) {
    return "Status must be Pending, In Progress, or Resolved.";
  }

  return null;
}

function validateCommentInput(commentData) {
  if (!commentData || typeof commentData !== "object") {
    return "Request body must be a valid comment object.";
  }

  const text = cleanText(commentData.text);

  if (!text) {
    return "Comment text is required.";
  }

  if (text.length > COMMENT_LIMITS.text) {
    return `Comment text must be ${COMMENT_LIMITS.text} characters or less.`;
  }

  return null;
}

function buildReportDocument(reportData) {
  const now = new Date().toISOString();
  const citizenName = cleanText(reportData.citizenName);
  const ownerId = cleanText(reportData.ownerId);

  return {
    id: `report-${randomUUID()}`,
    title: cleanText(reportData.title),
    description: cleanText(reportData.description),
    location: cleanText(reportData.location),
    type: cleanText(reportData.type),
    urgency: cleanText(reportData.urgency),
    status: "Pending",
    imageUrl: cleanText(reportData.imageUrl),
    citizenName: citizenName || "Anonymous Citizen",
    ownerId,
    comments: [],
    createdAt: now,
    updatedAt: now,
  };
}

function buildCommentDocument(commentData) {
  return {
    id: `comment-${randomUUID()}`,
    text: cleanText(commentData.text),
    author: "Anonymous Citizen",
    createdAt: new Date().toISOString(),
  };
}

app.http("getReports", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "reports",
  handler: async (request, context) => {
    try {
      const container = getReportsContainer();
      const { resources } = await container.items.readAll().fetchAll();
      const reports = resources.sort(
        (first, second) => new Date(second.createdAt) - new Date(first.createdAt)
      );

      return success(reports);
    } catch (exception) {
      context.error("Failed to fetch reports:", exception);
      return error("Unable to fetch reports.", 500);
    }
  },
});

app.http("createReport", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "reports",
  handler: async (request, context) => {
    try {
      let reportData;

      try {
        reportData = await request.json();
      } catch (exception) {
        context.error("Failed to parse report request body:", exception);
        return error("Request body must be valid JSON.", 400);
      }

      const validationError = validateReportInput(reportData);

      if (validationError) {
        return error(validationError, 400);
      }

      const report = buildReportDocument(reportData);
      const container = getReportsContainer();
      const { resource } = await container.items.create(report);

      return success(resource, 201);
    } catch (exception) {
      context.error("Failed to create report:", exception);
      return error("Unable to create report.", 500);
    }
  },
});

app.http("updateReportStatus", {
  methods: ["PATCH"],
  authLevel: "anonymous",
  route: "reports/{id}/status",
  handler: async (request, context) => {
    try {
      const reportId = request.params.id;
      let statusData;

      try {
        statusData = await request.json();
      } catch (exception) {
        context.error("Failed to parse status request body:", exception);
        return error("Request body must be valid JSON.", 400);
      }

      const validationError = validateStatusInput(statusData);

      if (validationError) {
        return error(validationError, 400);
      }

      const container = getReportsContainer();
      let report;

      try {
        report = await readReportById(container, reportId);
      } catch (exception) {
        context.error("Failed to find report for status update:", exception);

        if (isNotFoundError(exception)) {
          return error("Report not found.", 404);
        }

        throw exception;
      }

      if (!report) {
        return error("Report not found.", 404);
      }

      const updatedReport = {
        ...report,
        status: cleanText(statusData.status),
        updatedAt: new Date().toISOString(),
      };

      const { resource } = await container
        .item(reportId, reportId)
        .replace(updatedReport);

      return success(resource);
    } catch (exception) {
      context.error("Failed to update report status:", exception);
      return error("Unable to update report status.", 500);
    }
  },
});

app.http("addReportComment", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "reports/{id}/comments",
  handler: async (request, context) => {
    try {
      const reportId = request.params.id;
      let commentData;

      try {
        commentData = await request.json();
      } catch (exception) {
        context.error("Failed to parse comment request body:", exception);
        return error("Request body must be valid JSON.", 400);
      }

      const validationError = validateCommentInput(commentData);

      if (validationError) {
        return error(validationError, 400);
      }

      const container = getReportsContainer();
      let report;

      try {
        report = await readReportById(container, reportId);
      } catch (exception) {
        context.error("Failed to find report for comment creation:", exception);

        if (isNotFoundError(exception)) {
          return error("Report not found.", 404);
        }

        throw exception;
      }

      if (!report) {
        return error("Report not found.", 404);
      }

      const updatedReport = {
        ...report,
        comments: [...(report.comments || []), buildCommentDocument(commentData)],
        updatedAt: new Date().toISOString(),
      };

      const { resource } = await container
        .item(reportId, reportId)
        .replace(updatedReport);

      return success(resource, 201);
    } catch (exception) {
      context.error("Failed to add report comment:", exception);
      return error("Unable to add report comment.", 500);
    }
  },
});

app.http("deleteReport", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "reports/{id}",
  handler: async (request, context) => {
    try {
      const reportId = request.params.id;
      const ownerId = cleanText(request.headers.get("x-cleanindia-owner-id"));

      if (!ownerId) {
        return error("Owner ID is required to delete this report.", 400);
      }

      const container = getReportsContainer();
      let report;

      try {
        report = await readReportById(container, reportId);
      } catch (exception) {
        context.error("Failed to find report for deletion:", exception);

        if (isNotFoundError(exception)) {
          return error("Report not found.", 404);
        }

        throw exception;
      }

      if (!report) {
        return error("Report not found.", 404);
      }

      if (!report.ownerId || report.ownerId !== ownerId) {
        return error("You can only delete reports created from this browser.", 403);
      }

      await container.item(reportId, reportId).delete();

      return success({ id: reportId });
    } catch (exception) {
      context.error("Failed to delete report:", exception);
      return error("Unable to delete report.", 500);
    }
  },
});
