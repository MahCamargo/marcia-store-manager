const httpErrorMap = {
  SUCCESSFUL: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_VALUE: 422,
  DELETED: 204,
};

const mapStatusCode = (status) => httpErrorMap[status] || 500;

module.exports = mapStatusCode;