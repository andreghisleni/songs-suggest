import { Event } from '@/modules/events/entities/event.entity';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Song {
  id: string;

  name: string;
  artist: string;
  image?: string;
  duration: number;

  event: Event;

  suggestedById: string;
  suggestedByName: string;

  isPlayed: boolean;
  isRejected: boolean;

  createdAt: Date;
  updatedAt: Date;
}
