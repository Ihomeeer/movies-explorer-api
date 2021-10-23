const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFound');
const BadRequestError = require('../errors/BadRequest');
const ForbiddenError = require('../errors/Forbidden');

const errorCodes = {
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
};

// Получить все фильмы из сохраненок
const getAllMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send({ data: movies }))
    .catch((err) => {
      next(err);
    });
};

// Создать карточку с фильмом в сохраненках
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRu,
    nameEn,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRu,
    nameEn,
    movieId,
    owner,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

// Удалить карточку с фильмом из сохраненок
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError('Фильм с заданным id отсутствует в базе');
    })
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        // Удалять нельзя
        throw new ForbiddenError('Невозможно удалить чужой фильм');
      } else {
        Movie.findByIdAndRemove(req.params.movieId)
          .then((currentMovie) => res.status(200).send({ data: currentMovie }))
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      if (err.statuscode === errorCodes.FORBIDDEN) {
        next(err);
      } else if (err.statusCode === errorCodes.NOT_FOUND) {
        next(err);
      } else if (err.statusCode === errorCodes.BAD_REQUEST) {
        next(new BadRequestError('Ошибка в формате id фильма'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getAllMovies, createMovie, deleteMovie,
};
