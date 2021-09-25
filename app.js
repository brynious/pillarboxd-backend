const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const corsConfig = {
  credentials: true,
  origin: true,
};
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const watchlistRoutes = require('./routes/watchlist.routes');
const watchingRoutes = require('./routes/watching.routes');
const watchedRoutes = require('./routes/watched.routes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/auth.middleware');

const app = express();
app.use(cors(corsConfig));

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

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

// TODO: delete this and the other views from tutorial before pushing live
// app.get('/', (req, res) => res.render('home')); legacy function

// app.get('*', checkUser); // no login currently required to view other users lists
app.post('*', checkUser); // authorisation required for all POST requests
app.delete('*', checkUser); // authorisation required for all DELETE requests

app.use(authRoutes);
app.use(userRoutes);
app.use(watchlistRoutes);
app.use(watchingRoutes);
app.use(watchedRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
