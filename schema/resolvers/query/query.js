// const User = require('@models/userSchema')
const getSubredditPost = require('./getSubredditPost')
const getPostsByUser = require('./getPostsByUser')
const getRecentPosts = require('./getRecentPosts')
const getSinglePost = require('./getSinglePost')
const post = require('./post')
const comment = require('./comment')

module.exports = {
  Query: {
    show: () => "laugh",
    ...getSubredditPost.Query,
    ...getPostsByUser.Query,
    ...getRecentPosts.Query,
    ...getSinglePost.Query,
  },
  Post: {
    ...post.Post
  },
  Comment: {
    ...comment.Comment
  },
}