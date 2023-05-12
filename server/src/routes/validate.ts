import { FastifyInstance } from 'fastify';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

export async function validate(app: FastifyInstance) {
   const TokenSchema = z.object({
      token: z.string(),
   });

   app.post('/validate', async (req, reply) => {
      const { token } = TokenSchema.parse(req.body);

      const tokenIsValid = jwt.verify(token, process.env.JWT_SECRET!);

      if (typeof tokenIsValid !== 'string' && tokenIsValid?.id) {
         return reply.status(200).send({ isAuthenticated: true });
      } else {
         return reply.status(333).send({ isAuthenticated: false });
      }
   });
}
