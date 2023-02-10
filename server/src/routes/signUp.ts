import { FastifyInstance } from 'fastify';
import { z } from 'zod';

export function signUp(app: FastifyInstance) {
   const signUpSchema = z.object({
      name: z.string().trim().min(3).max(50),
      email: z.string().trim().email(),
      password: z.string().trim().min(8).max(50),
   });

   app.post('/signup', (req, res) => {
      const { email, name, password } = signUpSchema.parse(req.body);

      res.send(req.body);
   });
}
