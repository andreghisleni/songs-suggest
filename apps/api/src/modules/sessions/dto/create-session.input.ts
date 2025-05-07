import { z } from 'zod';

export const CreateSessionSchema = z
  .object({
    userId: z.string().uuid().describe('The user id'),
  })
  .describe('CreateSessionInput:');

export type CreateSessionInput = z.infer<typeof CreateSessionSchema>;
