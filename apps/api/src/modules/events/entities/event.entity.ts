import { Song } from '@/modules/songs/entities/song.entity';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Event {
  id: string;

  name: string;
  description: string;

  slug: string;

  logo: string;
  banner: string;

  isOpenedToReceiveSuggestions: boolean;
  isPeopleSequenceSuggestLimitable: boolean;
  numberOfPeopleSequenceSuggestLimit: number;

  songs: Song[];

  createdAt: Date;
  updatedAt: Date;
}
