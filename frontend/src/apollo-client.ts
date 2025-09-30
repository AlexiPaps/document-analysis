// frontend/src/apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
        uri: import.meta.env.VITE_BACKEND_URL,
    }),
    cache: new InMemoryCache(),
});

export default client;