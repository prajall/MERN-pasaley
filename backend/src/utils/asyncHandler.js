export const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message || "Internal Server Error",
    });
  }
};
