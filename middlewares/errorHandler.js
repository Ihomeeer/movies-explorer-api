const errorHandler = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // Проверка статуса ошибки и подкидывание соответствующего сообщения
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

module.exports = errorHandler;
