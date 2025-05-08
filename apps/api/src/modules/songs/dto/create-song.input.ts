import { ZodArgs } from 'nestjs-graphql-zod';
import { z } from 'zod';

export const CreateSongSchema = z
  .object({
    spotifyId: z.string().describe('The Spotify ID of the song.'),
    name: z.string().describe('The name of the song.'),
    artist: z.string().describe('The artist of the song.'),
    image: z.string().optional().describe('The image URL of the song.'),
    duration: z.number().min(0).describe('The duration of the song in seconds.'),

    eventId: z.string().uuid().describe('The ID of the event associated with the song.'),

    suggestedById: z.string().uuid().describe('The ID of the user who suggested the song.'),
    suggestedByName: z.string().describe('The name of the user who suggested the song.'),
  })
  .describe('CreateSongInput:');

export type CreateSongInput = ZodArgs.Of<typeof CreateSongSchema>;
