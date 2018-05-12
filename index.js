import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models';

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const graphqlEndpoint = '/graphql';

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use(graphqlEndpoint, bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

// Start the server
models.sequelize.sync().then(() => {
  app.listen(8080);
});

