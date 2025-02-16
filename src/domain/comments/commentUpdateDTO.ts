import z from 'zod';
import { commentDTO } from './commentDTO';

export const commentUpdateDTO = commentDTO.pick({
  content: true,
});

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICommentUpdate extends z.infer<typeof commentUpdateDTO> {}
