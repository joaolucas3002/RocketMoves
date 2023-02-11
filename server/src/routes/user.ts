import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';

export async function user(app: FastifyInstance) {
   app.post('user/:id', (req, res) => {
      req.body;
   });

   app.post('user/:id/title/:id', (req, res) => {
      req.body;

      const y =  prisma
   });
}
