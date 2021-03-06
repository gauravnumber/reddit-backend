require('module-alias/register')

const { ApolloServer } = require('apollo-server')
const { typeDefs, resolvers } = require('./schema')
const mongoose = require('mongoose')

const { MONGODB_URI, PORT } = require('@config')

const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
})

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Server running at ${url}`)

  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected.'))
    .catch(err => console.error(`MongoDB not connected: ${err.message}`))
})
  .catch(err => console.error(`Server not running: ${err.message}`))