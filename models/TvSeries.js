const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TvSeriesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  tmdb_id: {
    type: Number,
    unique: true,
    required: true,
  },
  overview: {
    type: String,
  },
  first_air_date: {
    type: String,
  },
  added_to_db: {
    type: Date,
    default: Date.now,
  },
  backdrop_path: {
    type: String,
    default: 'no backdrop',
  },
  poster_path: {
    type: String,
    default: 'no poster',
  },
  tagline: {
    type: String,
  },
});

module.exports = TvSeries = mongoose.model('TvSeries', TvSeriesSchema);
