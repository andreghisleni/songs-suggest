import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GraphQLISODateTime } from '@nestjs/graphql';
import { json } from 'express';
import type { GraphQLScalarType } from 'graphql';
import helmet from 'helmet';
import { setDefaultTypeProvider } from 'nestjs-graphql-zod';

import { EnvService } from './shared/env/env.service'; // eslint-disable-line

const CustomMaps: Record<string, GraphQLScalarType> = {
  Date: GraphQLISODateTime, // decided to use the custom scalar nestjs/graphql provides
};

setDefaultTypeProvider(name => {
  // As the Optional, Nullable and Array types can be processed internally
  // you may want to get the underlying, actual type name.
  while (name.startsWith('Optional<')) name = name.slice(9); // eslint-disable-line
  while (name.startsWith('Nullable<')) name = name.slice(9); // eslint-disable-line
  while (name.startsWith('Array<')) name = name.slice(6); // eslint-disable-line

  // return the corresponding custom scalar type
  return CustomMaps[name];
});

import { AppModule } from './app.module'; // eslint-disable-line

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  // app.use((req, res, next) => {
  //   console.log('req', req.headers);

  //   return next();
  // });

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
        },
      },
    }),
  );

  app.useGlobalPipes(new ValidationPipe());

  app.use(json({ limit: '50mb' }));

  const env = app.get(EnvService);

  const port = env.get('PORT');

  await app.listen(port);

  const logger = new Logger(AppModule.name);
  logger.log(`🤖 Server is running on ${await app.getUrl()}`);
}
bootstrap();
