const Post = require('@models/postSchema')

module.exports = {
  Query: {
    getSinglePost: async (_, { postId }) => {
      let post = await Post.findById(postId, "-comment")
      // let post = await Post.findById(postId).populate('comment')

      return post
    }
  }
}