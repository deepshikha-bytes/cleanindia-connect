const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:7075/api";

const OWNER_ID_KEY = "cleanindia_owner_id";

export function getCurrentOwnerId() {
  let ownerId = localStorage.getItem(OWNER_ID_KEY);

  if (!ownerId) {
    ownerId = `owner-${crypto.randomUUID()}`;
    localStorage.setItem(OWNER_ID_KEY, ownerId);
  }

  return ownerId;
}

async function requestApi(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let result;

  try {
    result = await response.json();
  } catch (error) {
    throw new Error("The server returned an unexpected response.");
  }

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Something went wrong. Please try again."
    );
  }

  return result.data;
}

export async function getReports() {
  return requestApi("/reports");
}

export async function addReport(report) {
  return requestApi("/reports", {
    method: "POST",
    body: JSON.stringify({
      title: report.title,
      description: report.description,
      location: report.location,
      type: report.type,
      urgency: report.urgency,
      citizenName: report.citizenName || "Anonymous Citizen",
      imageUrl: report.imageUrl || "",
      ownerId: getCurrentOwnerId(),
    }),
  });
}

export async function updateReportStatus(reportId, newStatus) {
  return requestApi(`/reports/${reportId}/status`, {
    method: "PATCH",
    body: JSON.stringify({
      status: newStatus,
    }),
  });
}

export async function addCommentToReport(reportId, commentData) {
  return requestApi(`/reports/${reportId}/comments`, {
    method: "POST",
    body: JSON.stringify({
      text: commentData.text,
    }),
  });
}

export async function deleteReport(reportId) {
  return requestApi(`/reports/${reportId}`, {
    method: "DELETE",
    headers: {
      "x-cleanindia-owner-id": getCurrentOwnerId(),
    },
  });
}
