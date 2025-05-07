'use client';

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  from,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { env } from '@/env';
import { getCookie } from 'cookies-next';
import { PropsWithChildren } from 'react';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

function separarURL(url: string): string {
  const protocolo = url.startsWith('https://') ? 'https://' : 'http://';
  return url.substring(protocolo.length);
}

function wssOrWs(url: string): string {
  return url.startsWith('https://') ? 'wss' : 'ws';
}

export const httpLink = createHttpLink({
  uri: `${env.NEXT_PUBLIC_API_URL}/graphql`,
  fetch,
});
const wsLink = new GraphQLWsLink(
  createClient({
    url: `${wssOrWs(env.NEXT_PUBLIC_API_URL)}://${separarURL(env.NEXT_PUBLIC_API_URL)}/graphql`,
  }),
);

const authMiddleware = setContext(async (operation, { headers }) => {
  // const { token } = await fetch('/api/auth/token').then(res => res.json())

  const token = getCookie('token');

  // console.log("token", token);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ``,
    },
  };
});

export const client = new ApolloClient({
  link: split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'; // eslint-disable-line
    },
    wsLink,
    from([authMiddleware, httpLink]),
  ),

  cache: new InMemoryCache(),
});

export const ApolloProviderWrapper = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
