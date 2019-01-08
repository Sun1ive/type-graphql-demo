import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'reflect-metadata';
import { Query, Resolver, buildSchema } from 'type-graphql';

@Resolver()
class Hello {
  @Query(() => String, {
    name: 'HelloWorld'
  })
  async hello() {
    return 'Hello world';
  }
}

const createServer = async () => {
  const schema = await buildSchema({
    resolvers: [Hello]
  });

  const apolloServer = new ApolloServer({
    schema,
    tracing: true
  });

  const app = express();

  apolloServer.applyMiddleware({ app });

  app.listen(3001, () =>
    console.log('Server running at port http://localhost:3001/graphql')
  );
};

createServer();
