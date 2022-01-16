const Post = require('@models/postSchema')

module.exports = {
  Query: {
    getSinglePost: async (_, { postId }) => {
      const post = await Post.findById(postId)

      // console.log('post', post)
      return post

      // return 'getSinglePost'
    }
  }
}