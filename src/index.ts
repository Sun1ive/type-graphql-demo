require('dotenv').config();

import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import jwtMiddleware from 'express-jwt';
import { ApolloServer, ApolloError } from 'apollo-server-express';
import { buildSchema, formatArgumentValidationError } from 'type-graphql';
import { createConnection } from 'typeorm';
import { ResgisterResolver } from './modules/user/Register';
import { LoginResolver } from './modules/user/Login';
import { IContext } from './types/Context';

const createServer = async () => {
  try {
    const app = express();

    const schema = await buildSchema({
      resolvers: [ResgisterResolver, LoginResolver]
    });

    const apolloServer = new ApolloServer({
      schema,
      formatError(error: ApolloError) {
        console.log(error);

        return formatArgumentValidationError(error);
      },
      context: ({ req }: IContext) => {
        const context = {
          req,
          user: req.user
        };

        return context;
      }
    });

    app
      .use(cors())
      .use(morgan('dev'))
      .use(
        '/graphql',
        jwtMiddleware({
          secret: process.env.JWT_SECRET!,
          credentialsRequired: false
        })
      );

    apolloServer.applyMiddleware({ app });

    await createConnection({
      type: 'postgres',
      logging: true,
      synchronize: true,
      name: 'default',
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USER,
      ssl: true,
      port: 5432,
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
