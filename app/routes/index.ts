/* eslint-disable no-magic-numbers */
import { FastifyInstance } from 'fastify';
import { addMovieSchema } from '../schema';
import { addMovie, getMovies, getMovieById } from '../controllers/movies';

export const registerRoutes = (app: FastifyInstance) => {

  app.get('/health', (req, res) => {

    res.code(200);
    res.send('OK!');

  });

  // Movies
  app.get('/movie', getMovies);
  app.get('/movie/:id', getMovieById);

  app.post('/movie', { schema: addMovieSchema }, addMovie);

};