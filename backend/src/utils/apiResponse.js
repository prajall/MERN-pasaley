export const apiResponse = (statuscode, message, data) => {
  return {
    success: true,
    statuscode: statuscode,
    message: message,
    data: data,
  };
};
