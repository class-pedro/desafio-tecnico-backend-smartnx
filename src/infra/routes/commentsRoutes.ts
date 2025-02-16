import { Router } from 'express';
import { commentController } from '../../controller/comment';
import { authenticationMiddleware } from '../../middlewares/authentication';

const commentsRoutes = Router();

commentsRoutes.use(authenticationMiddleware.handle);
commentsRoutes.post(
  '/comment',
  commentController.create.bind(commentController)
);
commentsRoutes.put(
  '/comment/:id',
  commentController.update.bind(commentController)
);
commentsRoutes.delete(
  '/comment/:id',
  commentController.delete.bind(commentController)
);
commentsRoutes.get(
  '/list-by-post/:id',
  commentController.listByPost.bind(commentController)
);

export { commentsRoutes };
