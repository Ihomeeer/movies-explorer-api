// схема для экземпляра фильма
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    // eslint-disable-next-line
    match: /https?:\/\/(www.)?[a-z0-9\-\._~:\/?#\[\]@!$&'\(\)*\+,;=]+.[a-z0-9\/]/i,
  },
  trailer: {
    type: String,
    required: true,
    // eslint-disable-next-line
    match: /https?:\/\/(www.)?[a-z0-9\-\._~:\/?#\[\]@!$&'\(\)*\+,;=]+.[a-z0-9\/]/i,
  },
  thumbnail: {
    type: String,
    required: true,
    // eslint-disable-next-line
    match: /https?:\/\/(www.)?[a-z0-9\-\._~:\/?#\[\]@!$&'\(\)*\+,;=]+.[a-z0-9\/]/i,
  },
  owner: {
    type: Number,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRu: {
    type: Number,
    required: true,
  },
  nameEn: {
    type: Number,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
