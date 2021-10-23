const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3001 } = process.env;
// подключение express
const app = express();
// dotenv, чтобы файлы env использовать
require('dotenv').config();
// helmet для защиты рабочей среды
const helmet = require('helmet');
// импорт celebrate для валидации полей запроса до попадания в контроллеры
const { errors } = require('celebrate');
// импорт cors
const cors = require('./middlewares/cors');
// импорт роутов для юзеров и фильмов, мидлвера проверки авторизации, хэндлера ошибок и прочего
const authCheck = require('./middlewares/auth');
const signRoute = require('./routes/index');
const userRoute = require('./routes/users');
const movieRoute = require('./routes/movies');
// импорт хэндлера ошибок и ошибки 404
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFound');
// импорт логгера
const { requestLogger, errorLogger } = require('./middlewares/logger');
// лимитер запросов
const { limiter } = require('./middlewares/limiter');

// подключение helmet
app.use(helmet());

// подключение БД
mongoose.connect('mongodb://localhost:27017/moviesdb', {
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

// Роут регистрации и логина, авторизацией НЕ защищен
app.use(signRoute);

// мидлвэр для авторизации
app.use(authCheck);

// Роуты пользователей и карточек фильмов
app.use('/', userRoute);

app.use('/', movieRoute);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Ошибка 404, такой страницы не существует'));
});

// Все, что ниже - обработчики и логгеры ошибок. И лимитер

// подключение лимитера
app.use(limiter);

// подключение логгера ошибок
app.use(errorLogger);

// мидлвэр для ошибок celebrate
app.use(errors());

// мидлвэр для обработчика ошибок
app.use(errorHandler);

app.listen(PORT);
