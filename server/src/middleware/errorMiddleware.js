export const notFound = (req, res, next) => {
  const error = new Error(`Not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

export const errorHandler = (error, _req, res, _next) => {
  const statusCode = error.statusCode || (error.name === "ValidationError" ? 400 : 500);

  const validationMessages =
    error.name === "ValidationError"
      ? Object.values(error.errors).map((item) => item.message)
      : undefined;

  res.status(statusCode).json({
    success: false,
    message:
      validationMessages?.[0] ||
      (error.code === 11000 ? "A record with this value already exists." : "") ||
      error.message ||
      "Something went wrong. Please try again.",
    errors: validationMessages,
  });
};
