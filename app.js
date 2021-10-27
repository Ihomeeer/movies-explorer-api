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
// импорт URL для подключения датабазы
const { MONGO_URL } = require('./utils/config');
// импорт cors
const cors = require('./middlewares/cors');
// импорт роутов для юзеров и фильмов, мидлвера проверки авторизации
const routes = require('./routes/index');
// импорт хэндлера ошибок
const errorHandler = require('./middlewares/errorHandler');
// импорт логгера
const { requestLogger, errorLogger } = require('./middlewares/logger');
// лимитер запросов
const { limiter } = require('./middlewares/limiter');

// подключение helmet
app.use(helmet());

// подключение БД
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// подключение парсера
app.use(express.json());

// подключение cors
app.use(cors);

// подключение лимитера
app.use(limiter);

// подключение логгера запросов
app.use(requestLogger);

// Подключение роутов регистрации, логина, юзеров, карточек, ошибки 404 и мидлвэра аутентификации
app.use(routes);

// Все, что ниже - обработчики и логгеры ошибок

// подключение логгера ошибок
app.use(errorLogger);

// мидлвэр для ошибок celebrate
app.use(errors());

// мидлвэр для обработчика ошибок
app.use(errorHandler);

app.listen(PORT);
