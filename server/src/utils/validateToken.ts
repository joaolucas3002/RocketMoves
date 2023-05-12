import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prismaQuery } from '../lib/prisma';
import { createRandonLoginTokenWithBCRYPT } from './createRandonLoginTokenWithBCRYPT';

export async function validateToken(
   req: FastifyRequest,
   reply: FastifyReply,
   done: () => void,
) {
   const remuverCookies = () => {
      req.unsignCookie('token');
      req.unsignCookie('validate');

      reply.status(401).send({
         error: 'Internal Server Error',
         statusCode: 500,
         message: '',
      });
   };

   const token = req.cookies.token;
   // const validate = req.cookies.validate;

   if (!token
      //  || !validate
       ) {
      return remuverCookies();
   }

   try {
      const resultToken = jwt.verify(token, process.env.JWT_SECRET!);

      if (typeof resultToken === 'string') {
         return remuverCookies();
      }

      const user = await prismaQuery.user.findUnique({
         where: { id: resultToken?.id },
      });

      if (!user) {
         return remuverCookies();
      }

      // const resultValidade = jwt.verify(
      //    validate,
      //    process.env.SECRET_KEY_COOKIE!,
      // );

      // const { loginToken } = user;

      // if (typeof resultValidade === 'string') {
      //    return;
      // }

      // const iqualLoginToken = bcrypt.compareSync(
      //    resultValidade?.loginToken,
      //    loginToken,
      // );

      // if (!iqualLoginToken) {
      //    const { bcryptToken } = createRandonLoginTokenWithBCRYPT();

      //    await prismaQuery.user.update({
      //       where: { id: resultToken?.id },
      //       data: { loginToken: bcryptToken },
      //    });

      //    return remuverCookies(); }

      console.log("oii");
      
      done();
   } catch (error) {
      remuverCookies();
   }
}
