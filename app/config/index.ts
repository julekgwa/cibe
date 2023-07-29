import { FastifyInstance } from 'fastify';
import { Movie } from '../models/Movie';
import mongoose from 'mongoose';
import { boomify } from '@hapi/boom';

const models = { Movie };

export const db = async (fastify: FastifyInstance, options: any) => {

  try {

    mongoose.connection.on('connected', () => {

      fastify.log.info({ actor: 'mongoDB' }, 'connected');

    });

    mongoose.connection.on('disconnected', () => {

      fastify.log.error({ actor: 'MongoDB' }, 'disconnected');

    });

    mongoose.connect(options.uri);

    fastify.decorate('db', { models });

  } catch (error: any) {

    boomify(error);

  }

};

