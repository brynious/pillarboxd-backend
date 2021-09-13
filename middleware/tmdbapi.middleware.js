const axios = require('axios');
const TvSeries = require('../models/TvSeries');

// checks if TV series already exists in the TvSeries collection
const checkSeriesInDB = async (req, res, next) => {
  try {
    const dbQuery = await TvSeries.findOne({ tmdb_id: req.params.tmdb_id });
    if (dbQuery) {
      // if TV show is in DB, assign entry data to res.locals.tmdb_data
      res.locals.tmdb_data = dbQuery;
      next();
    } else {
      // if not, call TMDB API and assign response to res.locals.tmdb_data
      const apiCall = await axios.get(
        `https://api.themoviedb.org/3/tv/${req.params.tmdb_id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
      );
      const data = { ...apiCall.data };
      const newSeriesData = {
        title: data.name,
        tmdb_id: data.id,
        overview: data.overview,
        first_air_date: data.first_air_date,
        backdrop_path: data.backdrop_path,
        poster_path: data.poster_path,
        tagline: data.tagline,
      };
      const newDbEntry = await TvSeries.create(newSeriesData);
      res.locals.tmdb_data = newDbEntry;
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { checkSeriesInDB };
