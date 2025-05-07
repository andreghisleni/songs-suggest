import { FilterInput } from '@/filter-input';
import { PrismaService } from '@/shared/database/prisma.service';
import { EnvService } from '@/shared/env/env.service';
import { PubSubService } from '@/shared/subscription/pubSub.service';
import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';

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

  // async create(event: EventGestao, closingId: string, phone?: string) {
  //   const shortId = generateShortId();

  //   const eventCreated = await this.prisma.event.create({
  //     data: {
  //       shortId,
  //       externalId: event.id,
  //       code: event.code,
  //       clientName: event.client.name,
  //       clientPhone: event.client.phone,
  //       totalProducts: event.total.products,
  //       totalValue: event.total.total,
  //       totalReceived: event.total.received,
  //       status: 'PENDING',
  //       closing: {
  //         connect: {
  //           id: closingId,
  //         },
  //       },
  //     },
  //   });

  //   await this.tasksQueue.add('send-whatsApp-message', {
  //     closingId,
  //     event: eventCreated,
  //     phone,
  //   });

  //   return eventCreated;
  // }

  // async reprocess(id: string, phone?: string) {
  //   const event = await this.findById(id);

  //   await this.tasksQueue2.add('get-event-to-reprocess-data', {
  //     event,
  //     closingId: event.closingId,
  //     phone,
  //   });

  //   return event;
  // }

  // async updateData(event: EventGestao, eventId: string, closingId: string, phone?: string) {
  //   const shortId = generateShortId();

  //   const eventUpdated = await this.prisma.event.update({
  //     where: {
  //       id: eventId,
  //     },
  //     data: {
  //       shortId,
  //       clientName: event.client.name,
  //       clientPhone: event.client.phone,
  //       totalProducts: event.total.products,
  //       totalValue: event.total.total,
  //       totalReceived: event.total.received,
  //       status: 'PENDING',
  //     },
  //   });

  //   await this.tasksQueue.add('send-whatsApp-message', {
  //     closingId,
  //     event: eventUpdated,
  //     phone,
  //   });

  //   return eventUpdated;
  // }

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

  // async findByShortId(shortId: string) {
  //   const event = await this.prisma.event.findFirst({
  //     where: { shortId },
  //   });

  //   if (!event) {
  //     throw new GraphQLError('Event not found', {
  //       extensions: {
  //         code: 400,
  //       },
  //     });
  //   }

  //   return event;
  // }

  // async findByExternalId(externalId: string) {
  //   throw new Error('Method not implemented.');
  //   // const response = await axios.get(`${this.env.get('API_LEGADO_URL')}/debtors/${externalId}`, {
  //   //   headers: {
  //   //     apiKey: this.env.get('API_LEGADO_KEY'),
  //   //   },
  //   // });

  //   // const debtor = eventSchema.safeParse(response.data);

  //   // console.log('error', debtor.error);

  //   // if (!debtor.success) {
  //   //   throw new GraphQLError('Event not found', {
  //   //     extensions: {
  //   //       code: 400,
  //   //     },
  //   //   });
  //   // }

  //   // return debtor.data;
  // }

  // async update(
  //   id: string,
  //   status: 'MESSAGE_SENDING' | 'MESSAGE_SENT' | 'ERROR_DURING_MESSAGE_SENDING',
  //   error?: string[],
  // ) {
  //   const event = await this.prisma.event.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       status,
  //       error,
  //     },
  //   });
  //   await this.pubSub.publish('eventUpdated', event);
  // }

  // async closing(eventId: string) {
  //   return this.prisma.event
  //     .findUnique({
  //       where: { id: eventId },
  //     })
  //     .closing();
  // }

  // async payments(eventId: string) {
  //   console.log(eventId);
  //   return this.prisma.event
  //     .findUnique({
  //       where: { id: eventId },
  //     })
  //     .payments();
  // }
}
