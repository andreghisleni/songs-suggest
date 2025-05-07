import { ZodArgs } from 'nestjs-graphql-zod';
import { z } from 'zod';

export const CreateEventSchema = z
  .object({
    name: z.string().describe('The name of the event.'),
    slug: z.string().describe('The slug of the event.'),
    logo: z.string().optional().describe('The logo of the event.'),
    banner: z.string().optional().describe('The banner of the event.'),
    description: z.string().optional().describe('The description of the event.'),
    isPeopleSequenceSuggestLimitable: z
      .boolean()
      .optional()
      .default(false)
      .describe('Whether the event is people sequence suggest limitable.'),
    numberOfPeopleSequenceSuggestLimit: z
      .number()
      .optional()
      .default(0)
      .describe('The number of people sequence suggest limit.'),
  })
  .describe('CreateEventInput:');

export type CreateEventInput = ZodArgs.Of<typeof CreateEventSchema>;
