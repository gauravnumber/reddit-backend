const { gql } = require('apollo-server')

const query = require('./query')
const mutation = require('./mutation')

module.exports.typeDefs = gql`
  ${query}
  ${mutation}
`
