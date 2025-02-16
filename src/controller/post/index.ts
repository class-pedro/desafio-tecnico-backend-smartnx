import { PostRepository } from '../../repository/post/PostRepository';
import { UserRepository } from '../../repository/user/userRepository';
import { PostService } from '../../service/post/PostService';
import { PostController } from './postController';

const userRepository = new UserRepository();
const postRepository = new PostRepository();
const postService = new PostService(postRepository, userRepository);
export const postController = new PostController(postService);
