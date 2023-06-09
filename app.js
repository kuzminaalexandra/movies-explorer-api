require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const { errors } = require('celebrate');

const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const limiter = require('./middlewares/limiter');

const {
  NODE_ENV, PORT, DATABASE_PROD, DATABASE_DEV,
} = require('./utils/config');

const { errorHandler } = require('./middlewares/errorHandler');
const { errorLogger, requestLogger } = require('./middlewares/requestLogger');
const corsHandler = require('./middlewares/corsHandler');

const router = require('./routes/index');

const app = express();

mongoose.connect(NODE_ENV === 'production' ? DATABASE_PROD : DATABASE_DEV, {
  useNewUrlParser: true,
});

app.use(corsHandler);
app.use(helmet());
app.use(requestLogger);
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадётт');
  }, 0);
});

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
