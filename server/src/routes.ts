import { FastifyInstance } from 'fastify';
import { z } from 'zod';

export async function appRoutes(app: FastifyInstance) {
   const userSchema = z.object({
      name: z.string().trim().min(3).max(50),
      email: z.string().trim().email(),
      password: z.string().trim().min(8).max(50),
   });

   app.post('/', (req, res) => {
      const { email, name, password } = userSchema.parse(req.body);

      res.send(req.body);
   });

   const schema = z.object({
      email: z.string().email(),
      uuid: z.string().uuid(),
   });

   app.post('/signup', (req, res) => {
      const { email, uuid } = schema.parse(req.body);

      res.send({ email, uuid });
   });

   app.post('/home', (req, res) => {
      const randon = Math.random();

      res.send({ id: randon, page: 'home' });
   });

   const newPostSchema = z.object({
      genres: z.string().array().min(0).max(24),
      title: z.string().trim().min(1).max(100),
      star: z.number().min(0).max(5),
      post: z.string().trim().min(3).max(1500),
   });

   app.post('/newpost', (req, res) => {
      const data = newPostSchema.parse(req.body);

      const obj = {
         data: z.date().safeParse(new Date()),
      };

      const string = "Borat: o segundo melhor repórter do glorioso país Cazaquistão viaja à América"

      

      const y = Object.assign(obj, {dd: string.length, data});

      res.send({ obj });
   });
}
