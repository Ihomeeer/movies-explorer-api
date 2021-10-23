const router = require('express').Router();
const { validateUpdateUser } = require('../middlewares/validator');
const {
  getUserInfo,
  updateUserProfile,
} = require('../controllers/users');

// Получить инфо об авторизированном пользователе ( о себе )
router.get('/users/me', getUserInfo);

// Обновить текущего пользователя (имя и инфо)
router.patch('/users/me', validateUpdateUser, updateUserProfile);

module.exports = router;
