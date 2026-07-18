function success(data, status = 200) {
  return {
    status,
    jsonBody: {
      success: true,
      data,
    },
  };
}

function error(message, status = 500) {
  return {
    status,
    jsonBody: {
      success: false,
      message,
    },
  };
}

module.exports = {
  success,
  error,
};