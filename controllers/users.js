const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET_PROD, JWT_SECRET_DEV } = require('../utils/config');

const { NotFoundError } = require('../errors/NotFoundError');
const { ConflictError } = require('../errors/ConflictError');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const { USER_NOT_FOUND, CONFLICT, UNAUTHORIZATION } = require('../utils/constants');

const User = require('../models/user');

module.exports.getUserData = (req, res, next) => {
  const { _id: userId } = req.user;

  User.findById(userId)
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 15)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => { res.send({ data: user }); })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT));
      } else {
        next(err);
      }
    });
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new UnauthorizedError(UNAUTHORIZATION);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedError(UNAUTHORIZATION);
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET_PROD : JWT_SECRET_DEV,
      { expiresIn: '7d' },
    );

    res.cookie('jwt', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    // sameSite: true
    res.status(200).send({ token });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError(USER_NOT_FOUND));
      }
      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({});
};
