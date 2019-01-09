import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../../entity/User';

@Resolver(User)
export class ResgisterResolver {
  @Mutation(() => User)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      id: v4(),
      email,
      password: hashedPassword
    }).save();

    return user;
  }
}
