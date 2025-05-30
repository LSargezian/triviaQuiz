import { ApolloClient, InMemoryCache } from '@apollo/client';

const API_URL = 'http://localhost:3000/graphql';

const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache(),
});

export default client;
