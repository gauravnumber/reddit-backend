const user = require('./user')
const upvoteDownvote = require('./upvoteDownvote')
const post = require('./post')
const comment = require('./comment')
const subreddit = require('./subreddit')

module.exports = {
  Mutation: {
    ...user.Mutation,
    ...post.Mutation,
    ...upvoteDownvote.Mutation,
    ...comment.Mutation,
    ...subreddit.Mutation,
  }
}