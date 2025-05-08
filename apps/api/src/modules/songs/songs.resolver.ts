import { FilterInput, FilterSchema } from '@/filter-input';
import { Public } from '@/shared/auth/public.decorator';
import { CheckPoliciesApp } from '@/shared/casl/policies.types';
import { PubSubService } from '@/shared/subscription/pubSub.service';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { ZodArgs } from 'nestjs-graphql-zod';

import { CreateSongInput, CreateSongSchema } from './dto/create-song.input';
import { Song } from './entities/song.entity';
import { SpotifySong } from './entities/spotify-song.entity';
import { SongsService } from './songs.service';

// const pubSub = new PubSub();

@Resolver(() => Song)
export class SongsResolver {
  constructor(
    private readonly songsService: SongsService,
    private readonly pubSub: PubSubService,
  ) {}

  @Public()
  @Subscription(() => Song, {
    resolve: (value: Song) => value,
    filter: (payload, variables) => {
      if (payload.eventId !== variables.eventId) {
        return false;
      }

      return true;
    },
  })
  songUpdated(@Args('eventId', { type: () => String }) eventId: string) {
    return this.pubSub.asyncIterableIterator('songUpdated');
  }

  // @CheckPoliciesApp(a => a.can('get-all', 'Song'))
  @Public()
  @Subscription(() => Song, {
    resolve: (value: Song) => value,
    filter: (payload, variables) => {
      if (payload.eventId !== variables.eventId) {
        return false;
      }

      return true;
    },
  })
  songAdded(@Args('eventId', { type: () => String }) eventId: string) {
    return this.pubSub.asyncIterableIterator('songAdded');
  }

  @Public()
  @Mutation(() => Song)
  createSong(
    @ZodArgs(CreateSongSchema, 'input', {
      name: 'CreateSongInput',
      description: 'Create a new collective sale',
    })
    input: CreateSongInput,
  ) {
    return this.songsService.create(input);
  }

  @CheckPoliciesApp(a => a.can('create', 'Song'))
  @Mutation(() => Song)
  async setPlayedSong(@Args('id', { type: () => String }) id: string) {
    return this.songsService.setPlayed(id);
  }

  @CheckPoliciesApp(a => a.can('create', 'Song'))
  @Mutation(() => Song)
  async setRejectedSong(@Args('id', { type: () => String }) id: string) {
    return this.songsService.setRejected(id);
  }

  @CheckPoliciesApp(a => a.can('get-all', 'Song'))
  @Query(() => [Song], { name: 'songs' })
  findAll(
    @ZodArgs(FilterSchema, 'filter', {
      name: 'FilterInput',
      description: 'Filtered a song',
      nullable: true,
      defaultValue: {},
    })
    filter: FilterInput,
  ) {
    return this.songsService.findAll(filter);
  }

  @CheckPoliciesApp(a => a.can('get-all', 'Song'))
  @Query(() => Number)
  getTotalSongs(
    @ZodArgs(FilterSchema, 'filter', {
      name: 'FilterInput',
      description: 'Filtered a song',
      nullable: true,
      defaultValue: {},
    })
    filter: FilterInput,
  ) {
    return this.songsService.findTotalSongs(filter);
  }

  @CheckPoliciesApp(a => a.can('get', 'Song'))
  @Query(() => Song, { name: 'song' })
  findById(@Args('id', { type: () => String }) id: string) {
    return this.songsService.findById(id);
  }

  @ResolveField()
  event(@Parent() { id }: Song) {
    return this.songsService.event(id);
  }

  @Public()
  @Mutation(() => [SpotifySong])
  async searchSpotify(@Args('query', { type: () => String }) query: string) {
    const songs = await this.songsService.spotifySearch(query);

    return songs;
  }
}
