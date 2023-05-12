import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import dayjs from 'dayjs';
import { prismaQuery } from '../lib/prisma';
import { validateToken } from '../utils/validateToken';
import jwt from 'jsonwebtoken';

export async function post(app: FastifyInstance) {
   const Schema = z.object({
      query: z.string(),
      page: z.number(),
      token: z.string(),
   });

   const TokenSchema = z.object({
      token: z.string(),
   });

   async function GetPosts(
      take: number,
      skip: number,
      authorId: string,
      query: string,
   ) {
      return await prismaQuery.post.findMany({
         take,
         skip,
         where: {
            authorId,
            title: {
               contains: query,
            },
         },
         select: {
            id: true,
            authorId: false,
            // date: true,
            body: true,
            stars: true,
            title: true,
            tags: {
               select: {
                  tag: true,
               },
            },
         },
         orderBy: {
            createdAt: 'desc',
         },
      });
   }

   app.post('/post', async (req, resu) => {
      const { token, page, query } = Schema.parse(req.body);

      const take = 4;
      const skip = (page - 1) * take;

      try {
         if (token) {
            const tokenIsValid = jwt.verify(token, process.env.JWT_SECRET!);

            if (typeof tokenIsValid !== 'string' && tokenIsValid?.id) {
               const postLength = await prismaQuery.post.findMany({
                  take: take + 1,
                  skip,
                  where: {
                     authorId: tokenIsValid.id,
                     title: {
                        contains: query,
                     },
                  },
                  select: { id: true },
                  orderBy: { createdAt: 'desc' },
               });

               const posts = await GetPosts(take, skip, tokenIsValid.id, query);

               const response = {
                  posts,
                  isAuthenticated: true,
                  previous: page > 1 ? page - 1 : undefined,
                  next: postLength.length > take ? page + 1 : undefined,
                  page: page,
                  query,
               };

               console.log(response);

               return resu.send(response);
            }
         } else {
            resu
               .status(400)
               .send({ menssage: 'Success', isAuthenticated: false });
         }
      } catch (error) {
         resu.status(400).send({ error, isAuthenticated: false });
      }
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
      body: z
         .string({ description: 'not a string' })
         .trim()
         .min(3, 'smail')
         .max(1500, 'big'),
      tags: z
         .array(z.string({ description: 'not a string' }))
         .min(0, 'smail')
         .max(24, 'big'),
      token: z.string({ description: 'not a string' }),
   });

   app.post(
      '/post/new',
      // , { preHandler: validateToken }
      async (req, resu) => {
         const { token } = TokenSchema.parse(req.body);

         console.log(req.cookies, token);

         const { tags, token: g, ...resut } = newPostSchema.parse(req.body);

         if (!token) {
            return resu.status(400).send({ isAuthenticated: false });
         }

         const tokenIsValid = jwt.verify(token, process.env.JWT_SECRET!);

         try {
            const date = dayjs().toDate();

            const existingTags = await prismaQuery.tag.findMany({
               where: {
                  tag: {
                     in: tags,
                  },
               },
            });

            const newTags = tags.filter((t) => {
               const Arraytags = existingTags.map(({ tag }) => tag);

               return !Arraytags.includes(t);
            });

            const createdTags = await Promise.all(
               newTags?.map((tag) => prismaQuery.tag.create({ data: { tag } })),
            );

            const FullTags = [...existingTags, ...createdTags];

            if (typeof tokenIsValid !== 'string' && tokenIsValid?.id) {
               console.log({ existingTags });
               console.log({ author: tokenIsValid?.id, published: true });

               const posts = await prismaQuery.post.create({
                  data: {
                     authorId: tokenIsValid?.id,
                     published: true,
                     ...resut,
                     tags: {
                        connect: FullTags.map(({ id }) => ({ id })),
                     },
                  },
               });

               console.log(posts);

               resu.send({ isAuthenticated: true });
            }
         } catch (error) {
            console.error(error);
            resu.status(400).send({ error, isAuthenticated: false });
         }
      },
   );

   const PostIdSchema = z.object({
      id: z.string().uuid('page not found'),
   });

   app.get('/post/:id', { preHandler: validateToken }, async (req, resu) => {
      const { id } = PostIdSchema.parse(req.params);
      // const token = req.cookies.token!;

      // const tokenIsValid = jwt.verify(token, process.env.JWT_SECRET!);

      try {
         const resut = await prismaQuery.post.findUnique({
            where: {
               id,
            },
            select: {
               // date: true,
               id: true,
               body: true,
               stars: true,
               title: true,
               tags: {
                  select: {
                     tag: true,
                  },
               },
               author: {
                  select: {
                     userName: true,
                  },
               },
            },
         });

         return resu.status(200).send(resut);
      } catch (error) {
         resu.status(400).send(error);
      }
   });

   // app.post(
   //    '/post/:id/edit',
   //    { preHandler: validateToken },
   //    async (req, resu) => {
   //       const { id } = PostIdSchema.parse(req.params);
   //       const token = req.cookies.token!;

   //       // const tokenIsValid = validateToken(token, process.env.JWT_SECRET!);

   //       try {
   //          const resut = await prismaQuery.post.findMany({
   //             where: {
   //                id,
   //             },
   //             include: {
   //                tags: true,
   //             },
   //          });

   //          resu.status(200).send(resut);
   //       } catch (error) {
   //          resu.status(400).send(error);
   //       }
   //    },
   // );

   const TagIdSchema = z.object({
      id: z.string(),
   });

   // app.post('/tag/:id', { preHandler: validateToken }, async (req, resu) => {
   //    const { id } = TagIdSchema.parse(req.params);

   //    try {
   //       const tag = await prismaQuery.tag.findMany({
   //          where: {
   //             tag: id,
   //          },
   //          include: {
   //             posts: {
   //                select: {
   //                   id: true,
   //                },
   //             },
   //          },
   //       });

   //       resu.status(200).send(tag);
   //    } catch (error) {
   //       resu.status(400).send(error);
   //    }
   // });
}
