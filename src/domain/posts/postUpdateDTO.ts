import z from 'zod';
import { postDTO } from './postDTO';

export const postUpdateDTO = postDTO.pick({
  content: true,
});

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IPostUpdate extends z.infer<typeof postUpdateDTO> {}
