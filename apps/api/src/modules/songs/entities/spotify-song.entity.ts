import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SpotifySong {
  id: string;
  name: string;
  artist: string;
  image: string;
  duration_ms: number;
}
