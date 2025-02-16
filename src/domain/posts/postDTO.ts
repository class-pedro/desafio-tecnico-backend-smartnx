import z from 'zod';
import { commentDTO } from '../comments/commentDTO';

export const postDTO = z.object({
  id: z.string().uuid(),
  content: z.string().min(1, 'O conteúdo não pode ser vazio.'),
  createdAt: z.date(),
  updatedAt: z.date(),
  authorId: z.string().min(1, 'O username é obrigatório.'),
  comments: z.array(commentDTO).optional(),
});

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IPost extends z.infer<typeof postDTO> {}
