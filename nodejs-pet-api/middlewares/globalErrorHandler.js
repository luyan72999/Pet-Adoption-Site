export const globalErrorHandler = (err, req, res, next) => {
  const stack = err?.stack;
  const statusCode = err?.statusCode? err?.statusCode: 500;  // 500: internal server error.
  const message = err?.message? err?.message: "Unknown error.";

  // send error response
  res.status(statusCode).json({stack, message})
}

// url not found error handler
export const urlNotFoundHandler = (req, res, next) => {
  // if request url does not exists, throw an error, and let the next middleware in the pipeline to handle it.
  const err = new Error(`Url ${req.originalUrl} is not found`);
  next(err);
}