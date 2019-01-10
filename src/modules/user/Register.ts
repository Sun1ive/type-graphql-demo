import { v4 } from 'uuid';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../../entity/User';
import { hashPassword } from '../../services/passwords';
import { RegisterArgs } from './Register/RegisterArgs';

@Resolver(User)
export class ResgisterResolver {
  @Mutation(() => User)
  async register(@Arg('data') { email, password }: RegisterArgs): Promise<User> {
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      id: v4(),
      email,
      password: hashedPassword
    }).save();

    return user;
  }
}
