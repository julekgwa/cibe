
import { boomify } from '@hapi/boom';
import { IMovie, Movie } from '../../models/Movie';

export const createMovie = async (payload: IMovie) => {

  const movie = new Movie(payload);

  return movie.save();

};

export const getMovies = async() => {

  return Movie.find({});

};

export const getMovieById = async(id: string) => {

  const movie = await Movie.findOne({ _id: id }).exec();

  if (!movie) {

    const error =  new Error('Movie not found');

    throw boomify(error, { statusCode: 400 });

  }

  return movie;

};