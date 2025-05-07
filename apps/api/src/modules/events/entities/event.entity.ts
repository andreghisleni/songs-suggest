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

  songs: string[]; // TODO: Change to a proper type

  createdAt: Date;
  updatedAt: Date;
}
