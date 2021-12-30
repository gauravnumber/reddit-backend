const Post = require('@models/postSchema')

module.exports = {
  Query: {
    getRecentPosts: async () => {
      const post = await Post.find().populate('owner')
      // console.log('post', post)
      return post
    }
  }
}