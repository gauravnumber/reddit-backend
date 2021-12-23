// const User = require('@models/userSchema')
const getSubredditPost = require('./getSubredditPost')
const getPostsByUser = require('./getPostsByUser')
const post = require('./post')

module.exports = {
  Query: {
    show: () => "laugh",
    ...getSubredditPost.Query,
    ...getPostsByUser.Query,
  },
  Post: {
    ...post.Post
  },
}