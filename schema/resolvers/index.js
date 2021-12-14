const query = require('./query')
const mutation = require('./mutation')

module.exports.resolvers = {
  ...query,
  ...mutation,
}