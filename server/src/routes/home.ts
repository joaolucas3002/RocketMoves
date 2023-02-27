import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prismaQuery } from '../lib/prisma';

export async function home(app: FastifyInstance) {
   const homeSchema = z.object({});

   app.post('/home', async (req, res) => {
      const randon = Math.random();

      try {
         const dade = await prismaQuery.post.findMany({
            include: { tags: {
               select:{
                  tag: true,
               }
            } },
         });

         res.send(dade);
      } catch (error) {
         return res.send({ error: error });
      }
   });
}
