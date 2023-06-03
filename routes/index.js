const router = require('express').Router();

const { NotFoundError } = require('../errors/NotFoundError');
const { ERROR_404 } = require('../utils/constants');

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { auth } = require('../middlewares/auth');

const { createUserValidate, loginValidate } = require('../middlewares/validate/userValidate');
const { login, createUser, logout } = require('../controllers/users');

router.post('/signin', loginValidate, login);
router.post('/signup', createUserValidate, createUser);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.use('/signout', auth, logout);

router.use('*', auth, (_, res, next) => {
  next(new NotFoundError(ERROR_404));
});

module.exports = router;
