const MOVIE_NOT_FOUND = 'Фильм не найден';
const BAD_REQUEST = 'Проверьте запрос';
const DELETE_FORBIDEN = 'Ошибка удаления.';
const USER_NOT_FOUND = 'Пользователь не найден';
const CONFLICT = 'Такие данные уже есть';
const UNAUTHORIZATION = 'Необходимо авторизоваться';
const ERROR_404 = 'Не найдено';

const regEx = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

module.exports = {
  MOVIE_NOT_FOUND,
  BAD_REQUEST,
  DELETE_FORBIDEN,
  USER_NOT_FOUND,
  CONFLICT,
  UNAUTHORIZATION,
  ERROR_404,
  regEx,
};
