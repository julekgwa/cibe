/* eslint-disable no-magic-numbers */
import { FastifyInstance } from 'fastify';
import { addMovie, getMovies, getMovieById } from '../controllers/movies';

export const registerRoutes = (app: FastifyInstance) => {

  app.get('/health', (req, res) => {

    res.code(200);
    res.send('OK!');

  });

  // Movies

  app.register(async(fastify) => {

    fastify.get('/v1/movies', {
      schema: {
        tags: ['Movies'],
        'summary': 'Get All Movies',
        'response': {
          '200': {
            'description': 'Successful response',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              message: { type: 'string' },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      },
    }, getMovies);

  });

  app.register(async(fastify) => {

    fastify.get('/v1/movies/:id', {
      schema: {
        tags: ['Movies'],
        summary: 'Get a Movie by ID',
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The ID of the movie to retrieve'
            }
          }
        },
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  title: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }, getMovieById);

  });

  app.register(async(fastify) => {

    fastify.post('/v1/movies', { schema: {
      summary: 'Create a Movie',
      tags: ['Movies'],
      description: 'Create a new movie',
      body: {
        'required': ['title'],
        type: 'object',
        properties: {
          title: { type: 'string' }
        }
      },
      'response': {
        '201': {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
              type: 'object',
              properties: {
                title: { type: 'string' }
              }
            }
          }
        }
      }
    }
    }, addMovie);

  });

};