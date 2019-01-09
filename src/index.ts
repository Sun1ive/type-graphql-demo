require('dotenv').config();

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { ResgisterResolver } from './modules/user/Register';

const createServer = async () => {
  try {
    const schema = await buildSchema({
      resolvers: [ResgisterResolver]
    });

    const apolloServer = new ApolloServer({
      schema,
      tracing: true,
      cacheControl: true
    });

    const app = express();

    apolloServer.applyMiddleware({ app });

    await createConnection({
      type: 'mongodb',
      logging: true,
      useNewUrlParser: true,
      url: process.env.DB_URL,
      entities: ['src/entity/*.*']
    });

    app.listen(3001, () =>
      console.log('Server running at port http://localhost:3001/graphql')
    );
  } catch (err) {
    console.log('Error while starting the server ' + err);
  }
};

createServer();
