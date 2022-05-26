const checkAuth = require('@context/check-auth')
const Post = require('@models/postSchema')

module.exports = {
  Mutation: {
    editPost: async (_, { postId, body }, context) => {
      const loginUser = checkAuth(context)
      const post = await Post.findByIdAndUpdate(postId, {
        body
      }, { new: true })

      // console.log(`post`, post)
      // console.log(`loginUser`, loginUser)

      return post
    }
  }
}
