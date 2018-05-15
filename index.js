import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';

import models from './models';

// Will load all files contained within schemas folder and will merge them
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')));
// Will load all files contained within resolvers folder and will merge them
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

// Put together a schemas
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const graphqlEndpoint = '/graphql';

// Initialize the app
const app = express();

// Adding cors;
app.use(cors('*'));

// The GraphQL endpoint
app.use(graphqlEndpoint, bodyParser.json(), graphqlExpress({
  schema,
  context: {
    models,
    user: {
      id: 1,
    },
  },
}));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

// Start the server
models.sequelize.sync().then(() => {
  app.listen(8082);
});

