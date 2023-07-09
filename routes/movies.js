const moviesRouter = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const { movieValidate, movieIdValidate } = require('../middlewares/validate/movieValidate');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', movieValidate, createMovie);
moviesRouter.delete('/:_id', movieIdValidate, deleteMovie);

module.exports = moviesRouter;
