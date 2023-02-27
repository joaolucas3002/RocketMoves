import fastify from 'fastify';
import { signUp } from './routes/signUp';
import { home } from './routes/home';
import { signIn } from './routes/signIn';
import { GetUser } from './routes/user';
import { post } from './routes/post';
import cors from '@fastify/cors';
import { FastifyInstance } from 'fastify/types/instance';
import cookie from '@fastify/cookie';
import jwt from '@fastify/jwt';

const app = fastify({
   logger: true,
});

declare const process: { env: { [key: string]: string } };

app.register(cookie, { secret: process.env.JWT_SECRET });

app.register(cors, {
   origin: ['http://localhost:5000', 'http://localhost:3000'],
   allowedHeaders: ['Content-Type', 'Authorization'],
   credentials: true,
   preflightContinue: false,
});

app.register(jwt, { secret: process.env.JWT_SECRET });

//----------------------//

app.register(GetUser);
app.register(signIn);
app.register(signUp);
app.register(home);
app.register(post);

async function StarterServer(app: FastifyInstance, port: number) {
   try {
      const server = await app.listen({ host: '0.0.0.0', port });
      console.log(`render project im port ${server}`);
   } catch (err) {
      console.log(err);
   }
}

StarterServer(app, 3000);
