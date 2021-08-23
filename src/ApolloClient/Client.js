import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
  } from "@apollo/client";
  
  //....playgrund for graphQL, this playground like postman to verify GraphQL Api...//
  const httpLink = new HttpLink({
    uri: "https://localhost:44371/graphql",
  });
  
  //....Initial Setup for Apollo Client...///
  export const Client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([httpLink]),
  });
  