import { Router } from 'express';
import { postController } from '../../controller/post';
import { authenticationMiddleware } from '../../middlewares/authentication';

const postsRoutes = Router();

postsRoutes.use(authenticationMiddleware.handle);
postsRoutes.post('/post', postController.create.bind(postController));
postsRoutes.get('/posts', postController.list.bind(postController));
postsRoutes.put('/post/:id', postController.update.bind(postController));
postsRoutes.delete('/post/:id', postController.delete.bind(postController));

export { postsRoutes };
