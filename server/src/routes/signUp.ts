import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { fastify, FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prismaQuery } from '../lib/prisma';
import { createCookeis } from '../utils/createCookeis';
import { cookiesOptions } from '../lib/cookiesOptions';
import { validate } from './validate';
import ms from 'ms';

interface validateErrorPorps {
   email: User | null;
   userName: User | null;
}

interface ErrorProps {
   message: string;
   path: string[];
}

function validateError({ email, userName }: validateErrorPorps) {
   let Error: ErrorProps[] = [];

   if (email)
      Error = [
         { message: 'Este e-mail já está registado', path: ['email'] },
         ...Error,
      ];

   if (userName)
      Error = [
         {
            message: 'Este UserName já está registado',
            path: ['userName'],
         },
         ...Error,
      ];

   console.log(Error);

   return Error;
}

export async function signUp(app: FastifyInstance) {
   const CreateUserSchema = z.object({
      userName: z
         .string()
         .trim()
         .min(4, 'userName deve ter pelo menos 4 caracteres')
         .max(25, 'O userName deve ter no máximo 25 caracteres'),
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

   app.post('/signup', async (req, reply) => {
      const nameToken = 'token';

      reply.unsignCookie(nameToken);

      const { email, password, userName } = CreateUserSchema.parse(req.body);

      const isName = await prismaQuery.user.findUnique({ where: { userName } });

      const isEmail = await prismaQuery.user.findUnique({ where: { email } });

      const error = validateError({ email: isEmail, userName: isName });

      if (error.length > 0) {
         return reply.status(300).send({
            error: 'Internal Server Error',
            statusCode: 500,
            message: JSON.stringify(error),
         });
      }

      const random = (Math.random() * 10 ** 32).toString();

      const { id } = await prismaQuery.user.create({
         data: { email, password, userName },
      });

      const token = jwt.sign({ id }, process.env.JWT_SECRET!, {
         expiresIn: ms(6 * 60 * 1000),
      });

      reply.setCookie(nameToken, token, cookiesOptions);

      reply.status(202).send({
         menssage: 'Success',
         isAuthenticated: true,
         [nameToken]: token,
      });
   });
}
