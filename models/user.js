const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Введите email'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Введен неправильный e-mail или пароль.',
    },
  },
  password: {
    type: String,
    required: [true, 'Введите пароль'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Введите имя'],
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина 30 символов'],
  },
});

module.exports = mongoose.model('user', userSchema);
