const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();

const {
  getUserInfo,
  updateUserProfile,
} = require('../controllers/users');

// Получить инфо об авторизированном пользователе ( о себе )
router.get('/users/me', getUserInfo);

// Обновить текущего пользователя (имя и инфо)
router.patch('/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  }), updateUserProfile);

module.exports = router;
