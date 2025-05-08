import { z } from 'zod';

export const songSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get-all'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
  ]),
  z.literal('Song'),
]);

export type SongSubject = z.infer<typeof songSubject>;
