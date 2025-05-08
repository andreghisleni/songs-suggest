import { FilterInput } from '@/filter-input';
import { PrismaService } from '@/shared/database/prisma.service';
import { EnvService } from '@/shared/env/env.service';
import { PubSubService } from '@/shared/subscription/pubSub.service';
import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';

import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

function generateShortId(): string {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let shortId = '';
  for (let i = 0; i < 6; i++) { // eslint-disable-line
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortId += characters[randomIndex];
  }
  return shortId;
}

@Injectable()
export class EventsService {
  constructor(
    private prisma: PrismaService,

    private readonly pubSub: PubSubService,
    private readonly env: EnvService,
  ) {}

  async create(input: CreateEventInput) {
    const eventCreated = await this.prisma.event.create({
      data: {
        ...input,
      },
    });

    return eventCreated;
  }

  async findAll(filter: FilterInput) {
    return this.prisma.event.findMany({
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
          {
            description: {
              contains: filter.filter,
              mode: 'insensitive',
            },
          },
          {
            slug: {
              contains: filter.filter,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  async findTotalEvents(filter: FilterInput) {
    return this.prisma.event.count({
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
          {
            description: {
              contains: filter.filter,
              mode: 'insensitive',
            },
          },
          {
            slug: {
              contains: filter.filter,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  async findById(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new GraphQLError('Event not found', {
        extensions: {
          code: 400,
        },
      });
    }

    return event;
  }

  async findBySlug(slug: string) {
    const event = await this.prisma.event.findFirst({
      where: { slug },
    });

    if (!event) {
      throw new GraphQLError('Event not found', {
        extensions: {
          code: 400,
        },
      });
    }

    return event;
  }

  async update(input: UpdateEventInput) {
    const eventExists = await this.prisma.event.findUnique({
      where: { id: input.id },
    });

    if (!eventExists) {
      throw new GraphQLError('Event not found', {
        extensions: {
          code: 400,
        },
      });
    }
    const eventUpdated = await this.prisma.event.update({
      where: { id: input.id },
      data: {
        ...input,
      },
    });

    await this.pubSub.publish('eventUpdated', eventUpdated);

    return eventUpdated;
  }

  async toggleIsOpenedToReceiveSuggestions(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new GraphQLError('Event not found', {
        extensions: {
          code: 400,
        },
      });
    }

    const eventUpdated = await this.prisma.event.update({
      where: { id },
      data: {
        isOpenedToReceiveSuggestions: !event.isOpenedToReceiveSuggestions,
      },
    });

    await this.pubSub.publish('eventUpdated', eventUpdated);

    return eventUpdated;
  }

  async songs(id: string) {
    return this.prisma.event
      .findUnique({
        where: { id },
      })
      .songs({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          isPlayed: false,
          isRejected: false,
        },
      });
  }
}
