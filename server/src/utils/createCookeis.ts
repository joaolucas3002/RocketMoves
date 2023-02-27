import { FastifyReply } from 'fastify';

export async function createCookeis(
   res: FastifyReply,
   id: string,
): Promise<FastifyReply> {
   const token = await res.jwtSign({ userId: id });

   return res.setCookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: 'lax',
   });
}
