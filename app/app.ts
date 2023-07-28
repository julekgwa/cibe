import fastify from 'fastify';
import { exit } from 'process';

const server = fastify();

server.get('/', async (req, res) => {
  res.send('Hello World')
})

server.listen({
  port: 8083,
  host: '0.0.0.0'
}, (err, address) => {
  if (err) {
    console.error(err);
    exit()

  }

  console.log(`Started server at ${address}`);

})