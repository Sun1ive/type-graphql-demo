import { compareSync } from 'bcrypt';
import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { User } from '../../entity/User';
import { ApolloError } from 'apollo-server-core';
import { RegisterArgs } from './Register/RegisterArgs';

@Resolver(User)
export class LoginResolver {
  @Query(() => String)
  async hello() {
    return 'hello world';
  }

  @Mutation(() => User)
  async login(@Arg('data') { email, password }: RegisterArgs): Promise<User> {
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) {
      throw new ApolloError('User was not found', '404');
    }

    if (!compareSync(password, user.password)) {
      throw new ApolloError('Password is incorrect', '403');
    }

    return user;
  }
}
