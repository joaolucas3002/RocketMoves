import fastify from 'fastify';
import { signUp } from './routes/signUp';
import { newPost } from './routes/newPost';
import { home } from './routes/home';
import { signIn } from './routes/signIn';

const app = fastify();

app.register(signIn);
app.register(signUp);
app.register(home);
app.register(newPost);

const port = 3333;

app.listen({
   port,
   host: '0.0.0.0',
}).then(() => {
   console.log(`server listening on port ${port}`);
   
});
