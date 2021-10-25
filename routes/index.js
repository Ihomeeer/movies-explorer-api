// Общий файл роутов, в котором описан весь роутинг и добавлен мидлвэр с авторизацией
const router = require('express').Router();
const signRoute = require('./signin-signup');
const userRoute = require('./users');
const movieRoute = require('./movies');
const authCheck = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFound');

router.use('/', signRoute);

router.use(authCheck);

router.use('/', userRoute);
router.use('/', movieRoute);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Ошибка 404, такой страницы не существует'));
});

module.exports = router;
