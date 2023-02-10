import { FastifyInstance } from 'fastify';
import { z } from 'zod';

export async function newPost(app: FastifyInstance) {
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

      const string =
         'Borat: o segundo melhor repórter do glorioso país Cazaquistão viaja à América';

      const y = Object.assign(obj, { dd: string.length, data });

      res.send({ obj });
   });
}
