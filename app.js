const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const cors = require('cors');

const Movie = require('./model/movie');
const movieRouter = require('./routes/movieRoutes');

// Initialize app with express
const app = express();

app.enable('trust proxy');

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());
app.options('*', cors());

// Set security HTTP headers
app.use(helmet());

// Limit request from same IP frequently
const limiter = rateLimit({
  max: 20,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// 2) Middlewares
// parse JSON
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Data Sanitization against NoSQL query Injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'title',
      'year',
      'rated',
      'imdb',
      'type'
    ]
  })
);

// compress all response
app.use(compression());

// 3) Routes
// Default Route
app.use('/', movieRouter);

// Get All Movies
app.use('/api/v1/movies', movieRouter);

//Create one Movie
app.use('/api/v1/movies', movieRouter);

// Get Movies By Name
app.use('/api/v1/movies', movieRouter);

// Get Movies By ID
app.use('/api/v1/movies', movieRouter);

// Update One Movies
app.use('/api/v1/movies', movieRouter);

// Delete One Movie
app.use('/api/v1/movies', movieRouter);


// rubbish point
app.all('*', (req, res, next) => {
  console.log(`Can't find ${req.originalUrl} on this server!`);
  res.send({ message: `Can't find ${req.originalUrl} on this server!` });
  next();
});

module.exports = app;