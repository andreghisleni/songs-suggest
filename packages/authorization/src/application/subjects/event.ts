import { z } from 'zod';

export const eventSubject = z.tuple([
  z.union([z.literal('manage'), z.literal('get-all'), z.literal('get')]),
  z.literal('Event'),
]);

export type EventSubject = z.infer<typeof eventSubject>;
