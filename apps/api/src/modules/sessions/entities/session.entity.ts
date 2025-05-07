import { User } from '@/modules/users/entities/user.entity';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Session {
  id: string;

  user: User;

  createdAt: Date;
  updatedAt: Date;
}
