const express = require('express');
const mongoose = require('mongoose');

// подключение express
const app = express();

// dotenv, чтобы файлы env использовать
require('dotenv').config();

// подключение helmet для защиты рабочей среды
const helmet = require('helmet');

app.use(helmet());

// импорт celebrate для валидации полей запроса до попадания в контроллеры
const { celebrate, Joi, errors } = require('celebrate');

// испорт cors
// const cors = require('./middlewares/cors');

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`App listening on port ${PORT}`);
});
