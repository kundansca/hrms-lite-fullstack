const globalErrorHandler = (error, request, response, next) => {
  const message = error?.message;
  const status = error?.status ? error.status : "Failed";
  const stack = error?.stack;

  response.status(500).json({ message, status, stack });
};

const notFound = (request, response, next) => {
  const error = new Error(
    `Cannot find the route for ${request.originalUrl} at the server`,
  );
  next(error);
};
module.exports = { notFound, globalErrorHandler };
