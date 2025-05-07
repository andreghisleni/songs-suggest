import { PrismaService } from '@/shared/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';

import { CreateSessionInput } from './dto/create-session.input';

@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService) { } // eslint-disable-line

  async create({ userId }: CreateSessionInput) {
    const session = await this.prisma.session.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return session;
  }

  async findById(id: string) {
    const session = await this.prisma.session.findUnique({
      where: {
        id,
      },
    });

    if (!session) {
      throw new GraphQLError('Session not found', {
        extensions: {
          code: 400,
        },
      });
    }

    return session;
  }

  async findUserSession(userId: string) {
    return this.prisma.session.findFirst({
      where: {
        userId,
      },
    });
  }

  async user(id: string) {
    return this.prisma.session
      .findUnique({
        where: {
          id,
        },
      })
      .user();
  }
}
