import fastify from 'fastify';
import { GetUser } from './routes/user';
import { signIn } from './routes/signIn';
import { signUp } from './routes/signUp';
import { home } from './routes/home';
import { post } from './routes/post';
import querystring from 'querystring';

import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import jwt from '@fastify/jwt';
import { validate } from './routes/validate';

declare const process: {
   env: { [key: string]: string };
};

const app = fastify({
   logger: true,
   // querystringParser: (str) => querystring.parse(str.toLowerCase()),
});
app.register(cookie, { secret: process.env.JWT_SECRET });

app.register(cors, {
   origin: process.env.ARRAY_CROSS_ORIGIN,
   allowedHeaders: ['Content-Type', 'Authorization'],
   credentials: true,
   preflightContinue: false,
});

app.register(jwt, { secret: process.env.JWT_SECRET! });

//----------------------//

app.register(GetUser);
app.register(signIn);
app.register(signUp);
app.register(home);
app.register(post);
app.register(validate);

const port = 3000;

app.listen({ port }, (err, address) => {
   console.log({ port });

   if (err) {
      console.log(err);
      console.log({ bhadfhsdbfsdgfsd: 3000 });
   }
});
