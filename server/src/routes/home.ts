import { FastifyInstance } from 'fastify';
import { z } from 'zod';

export async function home(app: FastifyInstance) {
   const homeSchema = z.object({});

   app.post('/home', (req, res) => {
      const randon = Math.random();

      res.send({ id: randon, page: 'home' });
   });
}
