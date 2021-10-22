const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3001 } = process.env;

// подключение express
const app = express();

// dotenv, чтобы файлы env использовать
require('dotenv').config();

// подключение helmet для защиты рабочей среды
const helmet = require('helmet');

app.use(helmet());

// импорт celebrate для валидации полей запроса до попадания в контроллеры
const { celebrate, Joi, errors } = require('celebrate');

// импорт cors
const cors = require('./middlewares/cors');

// импорт роутов для юзеров и фильмов, мидлвера проверки авторизации, хэндлера ошибок и прочего
const authCheck = require('./middlewares/auth');
const login = require('./controllers/login');
const { createUser } = require('./controllers/users');
const userRoute = require('./routes/users');
const movieRoute = require('./routes/movies');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFound');

// импорт логгера
const { requestLogger, errorLogger } = require('./middlewares/logger');

// подключение БД
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// подключение парсера
app.use(express.json());

// подключение cors
app.use(cors);

// подключение логгера запросов
app.use(requestLogger);

// роут для тестирования авто-поднятия сервера после крашей
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
}), createUser);

// мидлвэр для авторизации
app.use(authCheck);

// Роуты пользователей и карточек фильмов
app.use('/', userRoute);

app.use('/', movieRoute);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Ошибка 404, такой страницы не существует'));
});

// Все, что ниже - обязательно должно быть в конце скрипта

// подключение логгера ошибок
app.use(errorLogger);

// мидлвэр для ошибок celebrate
app.use(errors());

// мидлвэр для обработчика ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`App listening on port ${PORT}`);
});
