import { InputType, Field } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class LoginArgs {
  @Field()
  @Length(5, 25)
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
