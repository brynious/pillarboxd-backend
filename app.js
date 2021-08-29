const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const watchlistRoutes = require('./routes/watchlist.routes');
const watchingRoutes = require('./routes/watching.routes');
const watchedRoutes = require('./routes/watched.routes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/auth.middleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.DB_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

mongoose.set('useFindAndModify', false);

// routes
// app.get('*', checkUser);
app.post('*', checkUser);
app.delete('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.use(authRoutes);
app.use(userRoutes);
app.use(watchlistRoutes);
app.use(watchingRoutes);
app.use(watchedRoutes);
