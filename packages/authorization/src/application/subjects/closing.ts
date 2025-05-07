import { z } from 'zod';

export const closingSubject = z.tuple([
  z.union([z.literal('manage'), z.literal('create'), z.literal('get-all'), z.literal('get')]),
  z.literal('Closing'),
]);

export type ClosingSubject = z.infer<typeof closingSubject>;
