const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET_PROD, JWT_SECRET_DEV } = require('../utils/config');

const { UnauthorizedError } = require('../errors/UnauthorizedError');
const { UNAUTHORIZATION } = require('../utils/constants');

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError(UNAUTHORIZATION));
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET_PROD : JWT_SECRET_DEV,
    );
  } catch (err) {
    return next(new UnauthorizedError(UNAUTHORIZATION));
  }

  req.user = payload;

  return next();
};
