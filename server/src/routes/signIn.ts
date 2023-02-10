import { FastifyInstance } from 'fastify';
import { z } from 'zod';

export async function signIn(app: FastifyInstance) {
   const SignInSchema = z.object({
      email: z.string().trim().email(),
      password: z.string().trim().min(8).max(50),
   });

   app.post('/', (req, res) => {
      const { email, password } = SignInSchema.parse(req.body);
   });
}
