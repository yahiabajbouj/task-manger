import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User extends Document {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
