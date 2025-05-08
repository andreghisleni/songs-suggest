import { FilterInput } from '@/filter-input';
import { PrismaService } from '@/shared/database/prisma.service';
import { EnvService } from '@/shared/env/env.service';
import { PubSubService } from '@/shared/subscription/pubSub.service';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GraphQLError } from 'graphql';

import { CreateSongInput } from './dto/create-song.input';
import { ISpotifySearchData } from './dto/spotify-search';
import { SpotifySong } from './entities/spotify-song.entity';

@Injectable()
export class SongsService {
  constructor(
    private prisma: PrismaService,

    private readonly pubSub: PubSubService,
    private readonly env: EnvService,
  ) {}

  async create(input: CreateSongInput) {
    const songExists = await this.prisma.song.findFirst({
      where: {
        spotifyId: input.spotifyId,
        eventId: input.eventId,
      },
    });

    if (songExists) {
      throw new GraphQLError('Song already exists', {
        extensions: {
          code: 400,
        },
      });
    }

    const songCreated = await this.prisma.song.create({
      data: {
        ...input,
      },
    });

    await this.pubSub.publish('songAdded', songCreated);
    await this.pubSub.publish('songUpdated', songCreated);

    return songCreated;
  }

  async findAll(filter: FilterInput) {
    return this.prisma.song.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip: filter.page * filter.limit,
      take: filter.limit,
      where: {
        OR: [
          {
            name: {
              contains: filter.filter,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  async findTotalSongs(filter: FilterInput) {
    return this.prisma.song.count({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        OR: [
          {
            name: {
              contains: filter.filter,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  async findById(id: string) {
    const song = await this.prisma.song.findUnique({
      where: { id },
    });

    if (!song) {
      throw new GraphQLError('Song not found', {
        extensions: {
          code: 400,
        },
      });
    }

    return song;
  }

  async setPlayed(id: string) {
    const song = await this.prisma.song.findUnique({
      where: { id },
    });

    if (!song) {
      throw new GraphQLError('Song not found', {
        extensions: {
          code: 400,
        },
      });
    }

    const songUpdated = await this.prisma.song.update({
      where: { id },
      data: {
        isPlayed: true,
      },
    });

    await this.pubSub.publish('songUpdated', songUpdated);

    return songUpdated;
  }

  async setRejected(id: string) {
    const song = await this.prisma.song.findUnique({
      where: { id },
    });

    if (!song) {
      throw new GraphQLError('Song not found', {
        extensions: {
          code: 400,
        },
      });
    }

    const songUpdated = await this.prisma.song.update({
      where: { id },
      data: {
        isRejected: true,
      },
    });

    await this.pubSub.publish('songUpdated', songUpdated);

    return songUpdated;
  }

  async event(songId: string) {
    return this.prisma.song
      .findUnique({
        where: { id: songId },
      })
      .event();
  }

  async spotifySearch(query: string) {
    const responseToken = await axios.post<{ access_token: string }>(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.env.get('SPOTIFY_CLIENT_ID'),
        client_secret: this.env.get('SPOTIFY_CLIENT_SECRET'),
      }),
    );

    const { access_token } = responseToken.data;

    const response = await axios.get<ISpotifySearchData>('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        q: query, // O termo de busca que o usuário digitou
        type: 'track', // Queremos buscar por músicas (faixas)
        limit: 10,
      },
    });

    const spotifyData = response.data;

    if (!(spotifyData && spotifyData.tracks && spotifyData.tracks.items)) {
      throw new GraphQLError('Nenhuma música encontrada com esse termo.', {
        extensions: {
          code: 400,
        },
      });
    }

    const transformedTracks: SpotifySong[] = spotifyData.tracks.items
      .map(item => {
        let imageUrl;
        if (item.album && item.album.images && item.album.images.length > 0) {
          imageUrl = item.album.images.find(img => img.height === 64)?.url;
          if (!imageUrl) {
            imageUrl = item.album.images[item.album.images.length - 1]?.url;
          }
          if (!imageUrl && item.album.images.length > 0) {
            imageUrl = item.album.images[0].url;
          }
        }
        return {
          id: item.id,
          name: item.name,
          artist: item.artists.map(artist => artist.name).join(', '),
          image: imageUrl,
          duration_ms: item.duration_ms,
        };
      })
      .filter(track => track !== null);

    if (transformedTracks.length === 0) {
      throw new GraphQLError('Nenhuma música encontrada com esse termo.', {
        extensions: {
          code: 400,
        },
      });
    }
    return transformedTracks;
  }
}
