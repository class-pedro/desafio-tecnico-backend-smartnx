import z from 'zod';
import { postDTO } from './postDTO';

export const postCreateDTO = postDTO.pick({
  content: true,
  authorId: true,
});

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IPostCreate extends z.infer<typeof postCreateDTO> {}
