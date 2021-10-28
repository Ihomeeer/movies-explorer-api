//  Валидация в отдельном файле, чтобы роуты не забивать и чтобы линтер не ругался на регулярки
const { celebrate, Joi } = require('celebrate');
const isURL = require('validator/lib/isURL');
const BadRequestError = require('../errors/BadRequest');

const checkURL = (v) => {
  const result = isURL(v, { require_protocol: true });
  if (result) {
    return v;
  }
  throw new BadRequestError('Неправильный формат URL');
};

const validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(checkURL),
    trailer: Joi.string().required().custom(checkURL),
    thumbnail: Joi.string().required().custom(checkURL),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validateSignUp,
  validateSignIn,
  validateUpdateUser,
  validateCreateMovie,
  validateDeleteMovie,
};
