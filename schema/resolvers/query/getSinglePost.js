const Post = require('@models/postSchema')

module.exports = {
  Query: {
    getSinglePost: async (_, { postId, offset = 0, limit = 10 }) => {
      let post = await Post.findById(postId)
      // .populate({
      //   path: 'comment',
      //   options: {
      //     skip: offset,
      //     limit
      //   },
      // })

      console.log('post', post)
      //! remove post.comment
      return post
    }
  }
}