const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas'); // Your GraphQL type definitions and resolvers
const db = require('./config/connection');
const routes = require('./routes');
const { authMiddleware } = require('./utils/auth'); // Adjust the path based on your directory structure

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Apply REST API routes
app.use(routes);

// Initialize Apollo Server
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => authMiddleware({ req }), // Apply the auth middleware for GraphQL context
  });

  // Start the Apollo Server
  await server.start();
  
  // Apply Apollo middleware to the Express app
  server.applyMiddleware({ app });

  // Connect to the database and start the Express server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`🚀 GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

// Start the Apollo Server
startApolloServer();
