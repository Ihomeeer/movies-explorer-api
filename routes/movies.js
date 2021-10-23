const router = require('express').Router();
const {
  validateCreateMovie,
  validateDeleteMovie,
} = require('../middlewares/validator');
const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// Получить все сохраненные фильмы
router.get('/movies', getAllMovies);

// Создать новую карточку с фильмом с данными, полученными от API
router.post('/movies', validateCreateMovie, createMovie);

// Удалить фильм из сохраненок по id
router.delete('/movies/:movieId', validateDeleteMovie, deleteMovie);

module.exports = router;
