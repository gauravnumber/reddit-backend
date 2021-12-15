const user = require('./user')
const upvoteDownvote = require('./upvoteDownvote')
const post = require('./post')

module.exports = {
  Mutation: {
    ...user.Mutation,
    ...post.Mutation,
    ...upvoteDownvote.Mutation,
  }
}