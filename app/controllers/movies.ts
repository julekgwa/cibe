/* eslint-disable @typescript-eslint/ban-ts-comment */
import { boomify } from '@hapi/boom';
import { FastifyReply, FastifyRequest } from 'fastify';

import * as movies from '../clients/mongodb/movies';
import { IMovie } from '../models/Movie';
import { successResponse } from '../utils';

export const addMovie = async (req: FastifyRequest, res: FastifyReply) => {

  try {

    const response = await movies.createMovie(req.body as IMovie);
    const data = JSON.parse(JSON.stringify(response));

    successResponse(res, 'Successfully created a movie', data);

  } catch (error: any) {

    throw boomify(error);

  }

};

export const getMovies = async(req: FastifyRequest, res: FastifyReply) => {

  try {

    const response = await movies.getMovies();
    const data = JSON.parse(JSON.stringify(response));

    successResponse(res, 'Successfully retrieved movies', data);

  } catch (error: any) {

    throw boomify(error);

  }

};

export const getMovieById = async(req: FastifyRequest, res: FastifyReply) => {

  try {

    // @ts-ignore
    const response = await movies.getMovieById(req?.params?.id as string);
    const data = JSON.parse(JSON.stringify(response));

    successResponse(res, 'Successfully retrieved movies', data);

  } catch (error: any) {

    throw boomify(error, { statusCode: 400 });

  }

};