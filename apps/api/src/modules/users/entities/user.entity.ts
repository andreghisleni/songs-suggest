import { Session } from '@/modules/sessions/entities/session.entity';
import { application } from '@full-stack/authorization';
import { ObjectType, HideField, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  id: string;

  name: string;
  email: string;
  avatarUrl?: string;

  @HideField()
  passwordHash: string;

  @Field(() => String)
  role: application.Role;

  createdAt: Date;
  updatedAt: Date;

  passwordUpdatedAt: Date;

  activatedAt?: Date;
  blockedAt?: Date;

  ips: string; // TODO: Create ip entity

  sessions: Session[];
}
