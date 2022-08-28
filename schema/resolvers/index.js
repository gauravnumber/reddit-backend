const query = require('./query')
const mutation = require('./mutation')
// const GraphQLUpload = require('graphql-upload/GraphQLUpload.mjs');

module.exports.resolvers = {
  // Upload: GraphQLUpload,
  Upload: require("graphql-upload-minimal").GraphQLUpload,
  ...query,
  ...mutation,
}