import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export class LoggedUser {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  token: string;
}
