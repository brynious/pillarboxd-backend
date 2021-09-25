const User = require('../models/User');
const UserSeries = require('../models/UserSeries');

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
module.exports.test_user_series_get = (req, res) => {
  console.log(req);
  res.send('test successful');
  // User.findOne({ username: req.params.username }, 'username email watchlist')
  //   .populate('watchlist', 'title tmdb_id overview tagline backdrop_path poster_path first_air_date')
  //   .exec((err, results) => {
  //     if (err) {
  //       console.log(err);
  //       res.status(404).send('there was an error with this request');
  //     } else if (results === null) {
  //       res.status(404).send('no such user');
  //     } else {
  //       res.send(results.watchlist);
  //     }
  //   });
};

module.exports.test_user_series_post = async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  console.log(res.locals.user._id);
  console.log(res.locals.tmdb_data.title);

  res.send('test successful');

  try {
    const tvSeriesObj = await TvSeries.findOne({ tmdb_id: req.params.tmdb_id });
    // console.log(tvSeriesObj.title);
    // console.log(tvSeriesObj._id);
    const newUserSeriesData = {
      ...req.body,
    };
    console.log({ newUserSeriesData });
    // const userSeriesObj = UserSeries.create
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);
    res.status(400).json(errors);
  }
  // try {
  //   const tvSeriesObj = await TvSeries.findOne({ tmdb_id: req.params.tmdb_id });
  //   // remove series from 'watching' if it's already there
  //   await User.findOneAndUpdate({ _id: res.locals.user._id }, { $pull: { watching: tvSeriesObj._id } }, { new: true });
  //   // add series to desired list
  //   const updatedUser = await User.findOneAndUpdate(
  //     { _id: res.locals.user._id },
  //     { $addToSet: { watchlist: res.locals.tmdb_data } },
  //     { new: true, upsert: true }
  //   ).populate('watchlist');
  //   res.send(updatedUser.watchlist);
  // } catch (err) {
  //   const errors = handleErrors(err);
  //   console.log(errors);
  //   res.status(400).json(errors);
  // }
};

module.exports.test_user_series_delete = async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  res.send('test successful');
  // try {
  //   const tvSeriesObj = await TvSeries.findOne({ tmdb_id: req.params.tmdb_id });
  //   const updatedUser = await User.findOneAndUpdate(
  //     { _id: res.locals.user._id },
  //     { $pull: { watchlist: tvSeriesObj._id } },
  //     { new: true }
  //   ).populate('watchlist');
  //   res.send(updatedUser.watchlist);
  // } catch (err) {
  //   const errors = handleErrors(err);
  //   console.log(errors);
  //   res.status(400).json(errors);
  // }
};
