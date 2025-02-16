import { CommentsRepository } from '../../repository/comment/CommentsRepository';
import { PostRepository } from '../../repository/post/PostRepository';
import { UserRepository } from '../../repository/user/userRepository';
import { CommentService } from '../../service/comment/CommentService';
import { CommentController } from './commentController';

const commentsRepository = new CommentsRepository();
const usersRepository = new UserRepository();
const postsRepository = new PostRepository();
const commentService = new CommentService(
  commentsRepository,
  usersRepository,
  postsRepository
);
export const commentController = new CommentController(commentService);
