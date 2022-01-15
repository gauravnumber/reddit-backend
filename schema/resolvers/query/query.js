// const User = require('@models/userSchema')
const getSubredditPost = require('./getSubredditPost')
const getPostsByUser = require('./getPostsByUser')
const getRecentPosts = require('./getRecentPosts')
const post = require('./post')
const comment = require('./comment')

module.exports = {
  Query: {
    show: () => "laugh",
    ...getSubredditPost.Query,
    ...getPostsByUser.Query,
    ...getRecentPosts.Query,
  },
  Post: {
    ...post.Post
  },
  Comment: {
    ...comment.Comment
  },
}