const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const { env } = require('../../config/vars');

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
exports.converter = (err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (!(err instanceof APIError)) {
    const apiError = new APIError(
      err.message,
      err.status,
      err.isPublic,
      err.errors,
    );
    return next(apiError);
  }
  return next(err);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res, next) => {
  const err = new APIError('API not found.', httpStatus.NOT_FOUND, true);

  return next(err);
};

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
exports.handler = (err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    ...(env === 'development' ? { stack: err.stack } : {}),
    ...(err.errors ? { errors: err.errors } : {}),
  });
};
