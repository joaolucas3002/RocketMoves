import { FastifyInstance } from 'fastify';

export async function title(app: FastifyInstance) {
   app.post('title/:id', (req, res) => {
      req.body;
   });

   app.post('title/:id/posts', (req, res) => {
      req.body;
   });
}
