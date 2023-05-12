import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import ms from 'ms';

import { prismaQuery } from '../lib/prisma';
import {} from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookiesOptions } from '../lib/cookiesOptions';

export async function signIn(app: FastifyInstance) {
   const SignInSchema = z.object({
      email: z
         .string()
         .trim()
         .email('Por favor, informe um endereço de e-mail válido'),
      password: z
         .string()
         .trim()
         .min(8, 'A senha deve conter pelo menos 8 caracteres')
         .max(50, 'A senha deve ter no máximo 50 caracteres'),
   });

   app.post('/', async (req, reply) => {
      const nameToken = 'token';

      reply.unsignCookie(nameToken);

      const { email, password } = SignInSchema.parse(req.body);

      const user = await prismaQuery.user.findUnique({
         where: { email },
      });

      if (!user) {
         return reply.status(500).send({
            error: 'Internal Server Error',
            statusCode: 500,
            message: JSON.stringify([
               { message: 'email não encontrado', path: ['email'] },
            ]),
         });
      } else if (password !== user.password) {
         return reply.status(500).send({
            error: 'Internal Server Error',
            statusCode: 500,
            message: JSON.stringify([
               { message: 'senha incorreta', path: ['password'] },
            ]),
         });
      }

      const { id } = user;

      const token = jwt.sign({ id }, process.env.JWT_SECRET!, {
         expiresIn: ms( 6 * 60 * 1000),
      });

      reply.setCookie(nameToken, token, cookiesOptions);

      reply.status(202).send({
         menssage: 'Success',
         isAuthenticated: true,
         [nameToken]: token,
      });
   });
}
