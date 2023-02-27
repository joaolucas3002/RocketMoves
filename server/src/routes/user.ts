import { FastifyInstance } from 'fastify';
import { prismaQuery } from '../lib/prisma';
import { z } from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

export async function GetUser(app: FastifyInstance) {
   app.post('/full', (req, res) => {
      try {
         const Users = prismaQuery.user.findMany({
            
         });

         res.status(200).send(Users);
      } catch (error) {
         res.status(401).send(error);
      }
   });

}
