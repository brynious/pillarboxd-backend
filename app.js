const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const express = require('express');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const watchlistRoutes = require('./routes/watchlist.routes');
const watchingRoutes = require('./routes/watching.routes');
const watchedRoutes = require('./routes/watched.routes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/auth.middleware');

const cors = require('cors');
const corsConfig = {
  credentials: true,
  methods: 'GET,POST,DELETE',
  origin: /https:\/\/pillarboxd.netlify.app.*/,
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Accept-Encoding',
    'Accept-Language',
    'Connection',
    'Content-Length',
    'DNT',
    'Host',
    'Origin',
    'Referer',
    'sec-ch-ua',
    'sec-ch-ua-platform',
    'Sec-Fetch-Dest',
    'Sec-Fetch-Mode',
    'Sec-Fetch-Site',
    'User-Agent',
  ],
};

const app = express();

// database connection
const dbURI = process.env.DB_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.log(err);
  }
};

connectDB();

app.use(cors(corsConfig));

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

mongoose.set('useFindAndModify', false);

// routes

app.get('/', (req, res) => res.send('Hello world!'));

// app.get('*', checkUser); // no login currently required to view other users lists
app.post('*', checkUser); // authorisation required for all POST requests
app.delete('*', checkUser); // authorisation required for all DELETE requests

app.use(authRoutes);
app.use(userRoutes);
app.use(watchlistRoutes);
app.use(watchingRoutes);
app.use(watchedRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
