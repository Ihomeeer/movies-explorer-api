const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();

const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// Получить все сохраненные фильмы
router.get('/movies', getAllMovies);

// Удалить фильм из сохраненок по id
router.delete('/movies/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required().length(24).hex(),
    }),
  }), deleteMovie);

// Создать новую карточку с фильмом с данными, полученными от API
router.post('/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      // eslint-disable-next-line
      image: Joi.string().required().regex(/https?:\/\/(www.)?[a-z0-9\-\._~:\/?#\[\]@!$&'\(\)*\+,;=]+.[a-z0-9\/]/i),
      // eslint-disable-next-line
      trailer: Joi.string().required().regex(/https?:\/\/(www.)?[a-z0-9\-\._~:\/?#\[\]@!$&'\(\)*\+,;=]+.[a-z0-9\/]/i),
      // eslint-disable-next-line
      thumbnail: Joi.string().required().regex(/https?:\/\/(www.)?[a-z0-9\-\._~:\/?#\[\]@!$&'\(\)*\+,;=]+.[a-z0-9\/]/i),
      owner: Joi.string().required().length(24).hex(),
      nameRu: Joi.string().required(),
      nameEn: Joi.string().required(),
    }),
  }), createMovie);

module.exports = router;
