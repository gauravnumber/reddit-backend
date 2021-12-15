const user = require('./user')
const upvoteDownvote = require('./upvoteDownvote')
const post = require('./post')
const comment = require('./comment')

module.exports = {
  Mutation: {
    ...user.Mutation,
    ...post.Mutation,
    ...upvoteDownvote.Mutation,
    ...comment.Mutation,
  }
}