import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/voyagr-api",
    credentials: "include", // need to include this to send cookies/jwt with requests
  }),
  cache: new InMemoryCache(),
});

export default client;
