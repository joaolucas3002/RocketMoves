import fastify, { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prismaQuery } from '../lib/prisma';
import { User } from '@prisma/client';
import { createCookeis } from '../utils/createCookeis';

export async function signIn(app: FastifyInstance) {
   const SignInSchema = z.object({
      email: z.string().trim().email('Please inform a valid email address'),
      password: z
         .string()
         .trim()
         .min(8, 'Password must be at least 8 characters')
         .max(50, 'The password must have a maximum of 50 characters'),
   });

   app.post('/', async (req, res) => {
      const { email, password } = SignInSchema.parse(req.body);

      const user: void | User | null = await prismaQuery.user.findUnique({
         where: { email },
      });

      if (!user) {
         return res
            .status(500)
            .send(JSON.stringify({ message: { error: 'Incorrect email' } }));
      }

      if (password !== user.password) {
         return res
            .status(500)
            .send(JSON.stringify({ message: { error: 'Incorrect password' } }));
      }

      const restt = await createCookeis(res, user.id);

      console.log(restt);
   });
}
