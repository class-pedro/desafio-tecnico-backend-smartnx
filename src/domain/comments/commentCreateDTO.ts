import z from 'zod';
import { commentDTO } from './commentDTO';

export const commentCreateDTO = commentDTO.pick({
  postId: true,
  authorId: true,
  content: true,
});

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICommentCreate extends z.infer<typeof commentCreateDTO> {}
