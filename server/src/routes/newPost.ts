import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import dayjs from 'dayjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function newPost(app: FastifyInstance) {
   const newPostSchema = z.object({
      title: z.string().trim().min(1).max(100),
      star: z.number().min(0).max(5),
      post: z.string().trim().min(3).max(1500),
      tags: z
         .string()
         .array()
         .min(0)
         .max(24)
         .transform((e) => e.map((tag) => ({ tag: tag }))),
   });

   app.post('/newpost', async (req, res) => {
      const { post, tags, title, star } = newPostSchema.parse(req.body);

      const date = dayjs().toDate();

      const y = { post, title, star, tags: { create: tags }, date };

      try {
         await prisma.post.create({
            data: y,
         });

         res.send(y);
      } catch (error) {
         console.error(error);
      }
   });
}
