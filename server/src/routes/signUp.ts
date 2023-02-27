import { sign } from '@fastify/cookie';
import { User } from '@prisma/client';
import { fastify, FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prismaQuery } from '../lib/prisma';
import { createCookeis } from '../utils/createCookeis';
// import { secret } from '../lib/secret';

interface ErrorProps {
   userName?: string;
   email?: string;
   password?: string;
}

interface validateErrorPorps {
   email: User | null;
   userName: User | null;
}

function validateError({ email, userName }: validateErrorPorps) {
   let objError = {};

   if (email) {
      objError = { email: 'email is already registered', ...objError };
   }

   if (userName) {
      objError = { userName: 'UserName is already registered', ...objError };
   }

   return objError;
}

export async function signUp(app: FastifyInstance) {
   const CreateUserSchema = z.object({
      userName: z
         .string()
         .trim()
         .min(4, 'UserName must be at least 4 characters')
         .max(25, 'The userName must have a maximum of 25 characters'),
      email: z.string().trim().email('Please inform a valid email address'),
      password: z
         .string()
         .trim()
         .min(8, 'Password must be at least 8 characters')
         .max(50, 'The password must have a maximum of 50 characters'),
   });

   app.post('/signup', async (req, res) => {
      const { email, password, userName } = CreateUserSchema.parse(req.body);

      const isName = await prismaQuery.user.findUnique({ where: { userName } }).catch()

      const isEmail = await prismaQuery.user.findUnique({ where: { email } }).catch()

      const error = validateError({ email: isEmail, userName: isName });

      if (Object.keys(error).length > 0) {
         res.status(400).send(JSON.stringify(error));
         return;
      }

      const user = await prismaQuery.user.create({
         data: { email, password, userName },
      });

      await createCookeis(res, user.id);

      res.status(200).send({ message: 'Login successful' });
   });
}
