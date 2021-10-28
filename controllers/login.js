const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UnauthorizedError = require('../errors/Unauthorized');
const errorCodes = require('../utils/errorСodes');
const { JWT_SECRET } = require('../utils/config');

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .orFail(() => {
      throw new UnauthorizedError('Неправильные почта или пароль');
    })
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — выбрасывание ошибки БЕЗ УТОЧНЕНИЯ, что конкретно неправильно
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          // аутентификация успешна
          const token = jwt.sign(
            { _id: user._id },
            JWT_SECRET,
            { expiresIn: '7d' },
          );
          res.send({ token });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      if (err.statusCode === errorCodes.UNAUTHORIZED) {
        next(err);
      } else {
        next(err);
      }
    });
};

module.exports = login;
