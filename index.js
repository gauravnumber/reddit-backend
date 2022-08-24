require('module-alias/register')
const path = require("path")

const express = require('express')
const {
  ApolloServer,
  // graphqlUploadExpress
} = require('apollo-server-express')
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core');
const { graphqlUploadExpress } = require("graphql-upload-minimal");

// const graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.mjs');
// import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";

const mongoose = require('mongoose')


const { typeDefs, resolvers } = require('./schema')
const { MONGODB_URI, PORT } = require('@config')

// mongoose.set('debug', true)

async function startServer() {
  const server = new ApolloServer({
    cors: true,
    typeDefs,
    resolvers,
    // uploads: false,
    context: ({ req }) => ({ req }),
    // Using graphql-upload without CSRF prevention is very insecure.
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  })

  await server.start();

  const app = express();

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress({ maxFileSize: 10000, maxFiles: 10 }));

  server.applyMiddleware({ app });

  app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

  // app.get('/uploads/:image', (req, res) => {
  //   const pathname = path.join(__dirname, 'uploads', req.params.image)
  //   res.sendFile(pathname)
  // })

  await new Promise(r => app.listen({ port: 4000 }, err => {
    mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => console.log('MongoDB connected.'))
      .catch(err => console.error(`MongoDB not connected: ${err.message}`))

    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

    return r
  }));

}

startServer()
// server.listen({ port: PORT }).then(({ url }) => {
//   console.log(`Server running at ${url}`)

//   mongoose.connect(MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//     .then(() => console.log('MongoDB connected.'))
//     .catch(err => console.error(`MongoDB not connected: ${err.message}`))
// })
//   .catch(err => console.error(`Server not running: ${err.message}`))