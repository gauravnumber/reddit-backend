const user = require('./user')
const upvoteDownvote = require('./upvoteDownvote')
const upvoteDownvoteComment = require('./upvoteDownvoteComment')
const post = require('./post')
const comment = require('./comment')
const subreddit = require('./subreddit')
const deletePost = require('./deletePost')
const editPost = require('./editPost')
const upload = require('./upload')

module.exports = {
  Mutation: {
    ...user.Mutation,
    ...post.Mutation,
    ...upvoteDownvote.Mutation,
    ...upvoteDownvoteComment.Mutation,
    ...comment.Mutation,
    ...subreddit.Mutation,
    ...deletePost.Mutation,
    ...editPost.Mutation,
    ...upload.Mutation,
  }
}