const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSeriesSchema = new mongoose.Schema({
  tvSeries: {
    type: Schema.ObjectId,
    ref: 'TvSeries',
    required: [true, 'No Tv Series provided when logging TV series'],
  },
  rating: {
    type: Number,
    min: [1, 'must be between 1 and 10, got {VALUE}'],
    max: [10, 'must be between 1 and 10, got {VALUE}'],
  },
  inWatchlist: {
    type: Boolean,
    default: false,
  },
  dateAddedToWatchlist: {
    type: Date,
  },
  inWatching: {
    type: Boolean,
    default: false,
  },
  dateAddedToWatching: {
    type: Date,
  },
  inWatched: {
    type: Boolean,
    default: false,
  },
  dateAddedToWatched: {
    type: Date,
  },
  loggedInDiary: {
    type: Boolean,
    default: false,
  },
});

const UserSeriesList = mongoose.model('UserSeriesList', UserSeriesSchema);

module.exports = UserSeriesList;
