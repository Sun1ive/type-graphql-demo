import { InputType, Field } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';
import { isEmailInUse } from '../../../decorators/isEmailExist';

@InputType()
export class RegisterArgs {
  @Field()
  @Length(5, 25)
  @IsEmail()
  @isEmailInUse({ message: 'This email already in use' })
  email: string;

  @Field()
  password: string;
}
