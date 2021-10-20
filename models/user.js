// схема для пользователя
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
  },
},
{ versionKey: false });

// Функция убирает пароль из возвращаемого объекта при регистрации нового пользователя
userSchema.methods.toJSON = () => {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('user', userSchema);
