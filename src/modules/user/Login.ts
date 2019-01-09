import { compareSync } from 'bcrypt';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../../entity/User';
import { ApolloError } from 'apollo-server-core';

@Resolver(User)
export class LoginResolver {
  @Mutation(() => User)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const user = await User.findOne({ email });

    if (!user) {
      throw new ApolloError('User was not found', '404');
    }

    if (!compareSync(password, user.password)) {
      throw new ApolloError('Password is incorrect', '403');
    }

    return user;
  }
}
