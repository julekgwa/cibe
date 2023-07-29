import fastify from 'fastify';
import { exit } from 'process';
import { db } from './config';
import { registerRoutes } from './routes';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/movies';

const server = fastify({
  logger: true
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