const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');

const { MOVIE_NOT_FOUND, BAD_REQUEST, DELETE_FORBIDEN } = require('../utils/constants');

const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  const { _id: userId } = req.user;

  Movie.find({ owner: userId })
    .populate(['owner'])
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  const ownerId = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: ownerId,
  })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.send({ data: movie }))
    .catch((err) => next(err));
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id: movieId } = req.params;
  const { _id: userId } = req.user;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND);
      }
      if (userId !== movie.owner.toString()) {
        throw new ForbiddenError(DELETE_FORBIDEN);
      }
      return Movie.findByIdAndRemove(movieId)
        .then(() => res.send());
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST));
      } else {
        next(err);
      }
    });
};
