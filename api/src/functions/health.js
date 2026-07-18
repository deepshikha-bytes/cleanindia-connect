const { app } = require("@azure/functions");
const { success } = require("../shared/apiResponse");

app.http("health", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "health",
  handler: async () => {
    return success({
      message: "CleanIndia Connect API is running",
      status: "ok",
    });
  },
});