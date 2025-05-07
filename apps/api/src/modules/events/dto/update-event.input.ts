import { ZodArgs } from 'nestjs-graphql-zod';
import { z } from 'zod';

import { CreateEventSchema } from './create-event.input';

export const UpdateEventSchema = CreateEventSchema.merge(
  z.object({
    id: z.string().uuid().describe('Id of the event to update.'),
  }),
).describe('UpdateEventInput:');

export type UpdateEventInput = ZodArgs.Of<typeof UpdateEventSchema>;
