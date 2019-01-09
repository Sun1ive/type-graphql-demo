import bcrypt from 'bcrypt';
// import { getMongoManager } from 'typeorm';
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { User } from '../../entity/User';

@Resolver(User)
export class ResgisterResolver {
  @Query(() => String)
  async hello() {
    return 'Hello world';
  }

  @Mutation(() => User)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      password: hashedPassword
    }).save();

    return user;
  }
}
