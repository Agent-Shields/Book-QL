const express = require('express');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express')
// const path = require('path');
// import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas')
const db = require('./config/connection');
// const routes = require('./routes');
const { authMiddleware }  = require('./utils/auth');


const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  // create new Apollo server and pass in schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  })

  // start Apollo server
  await server.start();

  // integrate our apollo server with express app as middleware
  server.applyMiddleware({ app })

  // log where we can go test our GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
}

// initialize Apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
