import { InMemoryCache } from '@apollo/client/cache';
import { ApolloClient, ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { createHttpLink } from '@apollo/client/link/http';

console.log('process.env.APP_URL', process.env.APP_URL);
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

const uri = 'http://localhost:4000/graphql';

const http = createHttpLink({
  uri,
});

const setAuthorizationLink = setContext(() => {
  const token = '';

  return {
    headers: { authorization: token || '' },
  };
});
const link = ApolloLink.from([setAuthorizationLink, http]);

const cache = new InMemoryCache();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createApolloClient = (): ApolloClient<any> => {
  return new ApolloClient({
    cache,
    link,
  });
};
