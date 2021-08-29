const User = require('../models/User');

module.exports.username_get = async (req, res) => {
  try {
    const userObj = await User.findOne(
      { username: req.params.username },
      'username email watchlist'
    ).populate('watchlist watching watched');
    res.send(userObj);
  } catch (err) {
    console.log('Error getting user details');
    console.log(err);
    res.status(400).json(err);
  }
};
