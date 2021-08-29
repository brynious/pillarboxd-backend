const axios = require('axios');
const TvSeries = require('../models/TvSeries');

// checks if TV series already exists in the TvSeries collection
const checkSeriesInDB = async (req, res, next) => {
  try {
    const dbQuery = await TvSeries.findOne({ tmdb_id: req.body.tmdb_id });
    if (dbQuery) {
      // if present, assign entry data to res.locals.tmdb_data
      res.locals.tmdb_data = dbQuery;
      next();
    } else {
      // if not, call TMDB API and assign response to res.locals.tmdb_data
      axios
        .get(
          `https://api.themoviedb.org/3/tv/${req.body.tmdb_id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        )
        .then(response => {
          const data = { ...response.data };
          res.locals.tmdb_data = {
            title: data.name,
            tmdb_id: data.id,
            overview: data.overview,
            first_air_date: data.first_air_date,
            backdrop_path: data.backdrop_path,
            poster_path: data.poster_path,
            tagline: data.tagline,
          };
          TvSeries.create(res.locals.tmdb_data);
        })
        .then(() => {
          // the next function after this middleware adds the series to the logged in users watchlist
          // for some reason, next() is called before the above block is completed
          // this means it tries to add a TV series which hasn't been created in the final line of the above code yet
          next();
        })
        .catch(error => {
          console.log(error);
        });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { checkSeriesInDB };
