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
  nameRu: {
    type: String,
    required: true,
  },
  nameEn: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
