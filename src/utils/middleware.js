const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Path:  ", request.path);
  console.log("-----");
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unkown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

export default { requestLogger, unknownEndpoint, errorHandler };
