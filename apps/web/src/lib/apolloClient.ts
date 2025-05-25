import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
  "http://localhost:4000/voyagr-api";

const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    credentials: "include", // need to include this to send cookies/jwt with requests
  }),
  cache: new InMemoryCache(),
});

export default client;
