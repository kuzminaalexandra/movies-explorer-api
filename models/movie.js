const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Заполните название страны'],
  },
  director: {
    type: String,
    required: [true, 'Введите имя режиссера'],
  },
  duration: {
    type: Number,
    required: [true, 'Введите продолжительность фильма'],
  },
  year: {
    type: String,
    required: [true, 'Введите год выпуска'],
  },
  description: {
    type: String,
    required: [true, 'Введите описание'],
  },
  image: {
    type: String,
    required: [true, 'Введите ссылку на плакат'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Проверьте правильность URL',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Введите ссылку на трейлер'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Проверьте правильность URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Обязательно к заполнению'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Проверьте правильность URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: [true, 'Обязательно к заполнению'],
  },
  nameEN: {
    type: String,
    required: [true, 'Обязательно к заполнению'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
