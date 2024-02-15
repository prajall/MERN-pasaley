export const apiError = (statusCode, message) => {
  return {
    success: false,
    statusCode: statusCode,
    message: message,
  };
};
