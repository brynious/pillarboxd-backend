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
module.exports.user_watching_get = (req, res) => {
  User.findOne({ username: req.params.username }, 'username email watching')
    .populate('watching')
    .exec((err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results.watching);
      }
    });
};

module.exports.user_watching_post = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: res.locals.user._id },
      { $addToSet: { watching: res.locals.tmdb_data } },
      { new: true, upsert: true }
    ).populate('watching');
    res.send(updatedUser.watching);
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);
    res.status(400).json(errors);
  }
};

module.exports.user_watching_delete = async (req, res) => {
  try {
    const tvSeriesObj = await TvSeries.findOne({ tmdb_id: req.body.tmdb_id });
    const updatedUser = await User.findOneAndUpdate(
      { _id: res.locals.user._id },
      { $pull: { watching: tvSeriesObj._id } },
      { upsert: true, new: true }
    ).populate('watching');
    res.send(updatedUser.watching);
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);
    res.status(400).json(errors);
  }
};
