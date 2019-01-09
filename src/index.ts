import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'reflect-metadata';
import { buildSchema, Query, Resolver } from 'type-graphql';
import { createConnection, getMongoManager } from 'typeorm';
import { User } from './entity/user';

@Resolver()
class Hello {
  @Query(() => String)
  async hello() {
    return 'Hello world';
  }
}

@Resolver()
class Test {
  @Query(() => String)
  async Test() {
    const user = new User();
    user.email = 'foo';
    user.password = 'bar';

    const manager = getMongoManager();

    await manager.save(user);
    return 'user';
  }
}

const createServer = async () => {
  const schema = await buildSchema({
    resolvers: [Hello, Test]
  });

  const apolloServer = new ApolloServer({
    schema,
    tracing: true,
    cacheControl: true
  });

  const app = express();

  apolloServer.applyMiddleware({ app });

  createConnection({
    type: 'mongodb',
    useNewUrlParser: true,
    url: 'mongodb://Sunlive:d1abl0@ds145263.mlab.com:45263/demo-typeorm',
    poolSize: 12,
    entities: ['src/entity/*.ts']
  })
    .then(() => {
      app.listen(3001, () =>
        console.log('Server running at port http://localhost:3001/graphql')
      );
    })
    .catch(err => console.log('Error while connecting to db ' + err));
};

createServer();
