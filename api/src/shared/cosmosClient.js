const { CosmosClient } = require("@azure/cosmos");

let cachedClient;

function getRequiredSetting(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getCosmosClient() {
  if (!cachedClient) {
    cachedClient = new CosmosClient({
      endpoint: getRequiredSetting("COSMOS_DB_ENDPOINT"),
      key: getRequiredSetting("COSMOS_DB_KEY"),
    });
  }

  return cachedClient;
}

function getReportsContainer() {
  const databaseName = getRequiredSetting("COSMOS_DB_DATABASE_NAME");
  const containerName = getRequiredSetting("COSMOS_DB_REPORTS_CONTAINER");

  return getCosmosClient().database(databaseName).container(containerName);
}

module.exports = {
  getReportsContainer,
};
