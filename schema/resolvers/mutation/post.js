const checkAuth = require('@context/check-auth')

const Post = require('@models/postSchema')

module.exports = {
  Mutation: {
    post: async (_, { title, body }, context) => {
      const loginUser = checkAuth(context)

      const newPost = new Post({
        title,
        body,
        owner: loginUser._id,
        createdAt: new Date().toISOString(),
      })

      return await newPost.save()
    },

  }
}