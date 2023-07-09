const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500; // По умолчанию используется статус 500

  // Определяем сообщение об ошибке по статусу
  let errorMessage = '';
  if (statusCode === 500) {
    errorMessage = err.message;
  } else {
    errorMessage = err.message;
  }

  // Отправляем ответ с соответствующим статусом и сообщением об ошибке
  res.status(statusCode).json({ message: errorMessage });

  next();
};

module.exports = { errorHandler };
