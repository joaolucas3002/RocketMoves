import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import dayjs from 'dayjs';
import { prismaQuery } from '../lib/prisma';
import { secret } from '../lib/secret';
import { validateToken } from '../utils/validateToken';

export async function post(app: FastifyInstance) {
   const TokenSchema = z.object({
      token: z.string(),
   });

   const newPostSchema = z.object({
      title: z
         .string({ description: 'not a string' })
         .trim()
         .min(1, 'smail')
         .max(100, 'big'),
      stars: z
         .number({ description: 'not a number' })
         .min(0, 'smail')
         .max(5, 'big'),
      post: z
         .string({ description: 'not a string' })
         .trim()
         .min(3, 'smail')
         .max(1500, 'big'),
      tags: z
         .array(z.string({ description: 'not a string' }))
         .min(0, 'smail')
         .max(24, 'big'),
   });

   app.post('/post', async (req, res) => {
      const { token } = TokenSchema.parse(req.body);

      const tokenIsValid = validateToken(token, secret);

      try {
         if (tokenIsValid?.userId) {
            const val = await prismaQuery.post.findMany({
               where: {
                  userId: tokenIsValid?.userId,
               },
               select: {
                  id: true,
                  userId: false,
                  date: true,
                  post: true,
                  stars: true,
                  title: true,
                  tags: {
                     select: {
                        tag: true,
                     },
                  },
               },
            });

            res.status(203).send(val);
         }
      } catch (error) {
         res.send(error);
      }
   });

   app.post('/post/new', async (req, res) => {
      const newPostWithToken = newPostSchema.merge(TokenSchema);

      const { token, tags, ...rest } = newPostWithToken.parse(req.body);

      const tokenIsValid = validateToken(token, secret);

      try {
         const date = dayjs().toDate();

         const existingTags = await prismaQuery.tag.findMany({
            where: { tag: { in: tags } },
         });

         const newTags = tags.filter((t) => {
            const Arraytags = existingTags.map(({ tag }) => tag);

            return !Arraytags.includes(t);
         });

         const createdTags = await Promise.all(
            newTags?.map((tag) => prismaQuery.tag.create({ data: { tag } })),
         );

         const FullTags = [...existingTags, ...createdTags];

         if (tokenIsValid?.userId) {
            const postt = await prismaQuery.post.create({
               data: {
                  userId: tokenIsValid.userId,
                  date,
                  tags: {
                     connect: FullTags.map(({ id }) => ({ id })),
                  },
                  ...rest,
               },
            });

            res.send(postt);
         }
      } catch (error) {
         console.error(error);
         res.send(error);
      }
   });

   const PostIdSchema = z.object({
      id: z.string().uuid(),
   });

   app.post('/post/:id', async (req, res) => {
      const { id } = PostIdSchema.parse(req.params);
      const { token } = TokenSchema.parse(req.body);

      const tokenIsValid = validateToken(token, secret);

      try {
         const rest = await prismaQuery.post.findUnique({
            where: {
               id,
            },
            select: {
               date: true,
               id: true,
               post: true,
               stars: true,
               title: true,
               tags: {
                  select: {
                     tag: true,
                  },
               },
               user: {
                  select: {
                     userName: true,
                  },
               },
            },
         });

         return res.status(200).send(rest);
      } catch (error) {
         res.status(400).send(error);
      }
   });

   app.post('/post/:id/edit', async (req, res) => {
      const { id } = PostIdSchema.parse(req.params);
      const { token } = TokenSchema.parse(req.body);

      const tokenIsValid = validateToken(token, secret);

      try {
         const rest = await prismaQuery.post.findMany({
            where: {
               id,
            },
            include: {
               tags: true,
            },
         });

         res.status(200).send(rest);
      } catch (error) {
         res.status(400).send(error);
      }
   });

   const TagIdSchema = z.object({
      id: z.string(),
   });

   app.post('/tag/:id', async (req, res) => {
      const { id } = TagIdSchema.parse(req.params);

      try {
         const tag = await prismaQuery.tag.findMany({
            where: {
               tag: id,
            },
            include: {
               posts: {
                  select: {
                     id: true,
                  },
               },
            },
         });

         res.status(200).send(tag);
      } catch (error) {
         res.status(400).send(error);
      }
   });
}
