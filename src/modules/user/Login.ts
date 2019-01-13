import { v4 } from 'uuid';
import { compareSync } from 'bcrypt';
import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { User } from '../../entity/User';
import { ApolloError } from 'apollo-server-core';
import { LoginArgs } from './Login/LoginArgs';
import { generateToken } from '../../services/jwt';
import { LoggedUser } from './Login/LoggedUser';
import { Token } from '../../entity/Token';

@Resolver()
export class LoginResolver {
  @Query(() => String)
  async hello() {
    return 'hello world';
  }

  @Mutation(() => LoggedUser)
  async login(@Arg('data') { email, password }: LoginArgs): Promise<
    LoggedUser
  > {
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

    const token = generateToken({ userId: user.id });
    const refreshToken = v4();

    await Token.create({
      id: v4(),
      userId: user.id,
      token,
      refreshToken
    }).save();

    const data = {
      id: user.id,
      email: user.email,
      token,
      refreshToken
    };

    return data;
  }
}
