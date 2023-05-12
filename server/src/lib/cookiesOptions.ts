import { CookieSerializeOptions } from '@fastify/cookie';

export const cookiesOptions: CookieSerializeOptions = {
   httpOnly: true,
   secure: true,
   maxAge: 1000 * 60 * 60 * 24 * 30,
   sameSite: 'lax',
};
