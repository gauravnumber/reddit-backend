// const User = require('@models/userSchema')
const getSubredditPost = require('./getSubredditPost')
const post = require('./post')

module.exports = {
  Query: {
    show: () => "laugh",
    ...getSubredditPost.Query,
  },
  Post: {
    ...post.Post
  },
}