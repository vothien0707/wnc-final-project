const responseWithData = (res, statusCode, data) => {
  return res.status(statusCode).json(data);
};

const ok = (res, data) => {
  return responseWithData(res, 200, data);
};

const created = (res, data) => {
  return responseWithData(res, 201, data);
};

const badRequest = (res, message) => {
  return responseWithData(res, 400, {
    status: 400,
    message,
  });
};

const unauthorizedError = (res) => {
  return responseWithData(res, 401, {
    status: 401,
    message: "Unauthorized !!!",
  });
};

const notFound = (res) => {
  return responseWithData(res, 404, {
    status: 404,
    message: "Resource not found !!!",
  });
};

const internalServerError = (res) => {
  return responseWithData(res, 500, {
    status: 500,
    message: "Something wrong !!!",
  });
};

export default { ok, created, badRequest, unauthorizedError, notFound, internalServerError };
