const usersRouter = require('express').Router();
const {
  getUserData, updateUser,
} = require('../controllers/users');

const {
  userValidate,
} = require('../middlewares/validate/userValidate');

usersRouter.get('/me', getUserData);
usersRouter.patch('/me', userValidate, updateUser);

module.exports = usersRouter;
