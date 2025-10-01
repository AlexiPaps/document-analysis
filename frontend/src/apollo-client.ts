import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
        uri: import.meta.env.VITE_APOLLO_CLIENT_URI || 'https://document-analysis-n78s.vercel.app/graphql',
    }),
    cache: new InMemoryCache(),
});

export default client;