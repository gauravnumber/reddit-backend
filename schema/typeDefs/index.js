const { gql } = require('apollo-server-express')

const type = require('./type')
const query = require('./query')
const mutation = require('./mutation')

module.exports.typeDefs = gql`
  ${type}
  ${query}
  ${mutation}
`
