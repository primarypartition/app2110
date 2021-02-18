const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql `
    type Query {
        greeting: String
    }
`;

const resolvers = {
    Query: {
        greeting: () => 'Hello World!'
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen({ port: 9000 })
    .then((serverInfo) => console.log(`Server at ${serverInfo.url}`));

/*
http://localhost:9000/
  
  
  
*/