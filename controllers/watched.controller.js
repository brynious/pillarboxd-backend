const User = require('../models/User');

// handle errors
const handleErrors = err => {
  console.log(err.message, err.code);
  let errors = {};

  // not authorised
  if (err.message === `Cannot read property '_id' of null`) {
    errors.authentication = 'you are not authenticated';
  }

  return errors;
};

// controller actions
module.exports.user_watched_get = (req, res) => {
  User.findOne({ username: req.params.username }, 'username email watched')
    .populate(
      'watched',
      'title tmdb_id overview tagline backdrop_path poster_path first_air_date'
    )
    .exec((err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results.watched);
      }
    });
};

module.exports.user_watched_post = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: res.locals.user._id },
      { $addToSet: { watched: res.locals.tmdb_data } },
      { new: true, upsert: true }
    ).populate('watched');
    res.send(updatedUser.watched);
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);
    res.status(400).json(errors);
  }
};

module.exports.user_watched_delete = async (req, res) => {
  try {
    const tvSeriesObj = await TvSeries.findOne({ tmdb_id: req.params.tmdb_id });
    const updatedUser = await User.findOneAndUpdate(
      { _id: res.locals.user._id },
      { $pull: { watched: tvSeriesObj._id } },
      { upsert: true, new: true }
    ).populate('watched');
    res.send(updatedUser.watched);
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);
    res.status(400).json(errors);
  }
};
