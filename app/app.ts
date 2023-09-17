import fastify from 'fastify';
import { exit } from 'process';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { db } from './config';
import { registerRoutes } from './routes';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/movies';

const server = fastify({
  logger: true
});

server.register(swagger, {
  openapi: {
    info: {
      title: 'Test swagger',
      description: 'testing the fastify swagger api',
      version: '0.1.0'
    },
    servers: [{
      url: '/v1'
    }],
    'components': {
      'schemas': {
        'Movie': {
          'type': 'object',
          'properties': {
            'title': {
              'type': 'string'
            }
          },
          'required': ['title']
        }
      }
    }
  }
});

server.register(swaggerUI, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  }
});

server.register(db, { uri });

registerRoutes(server);

server.listen({
  port: 8083,
  host: '0.0.0.0'
},  (err, address) => {

  if (err) {

    console.error(err);
    exit();

  }

  console.log(`Started server at ${address}`);

});