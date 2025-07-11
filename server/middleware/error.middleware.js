const errormiddleware = (err, req, res, next) => {
  const statusCode = typeof err.statusCode === "number" ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

export default errormiddleware;