const checkAuth = require('@context/check-auth')

const Post = require('@models/postSchema')

const user = require('./user')
const upvoteDownvote = require('./upvoteDownvote')

module.exports = {
  Mutation: {
    ...user.Mutation,
    ...upvoteDownvote.Mutation,

    post: async (_, { title, body }, context) => {
      const loginUser = checkAuth(context)

      const newPost = await Post({
        title,
        body,
        owner: loginUser._id,
        createdAt: new Date().toISOString(),
      })

      const newPostSave = await newPost.save()

      // console.log('newPostSave._doc', newPostSave._doc)

      return { ...newPostSave._doc }
      // return { id: newPostSave._id, ...newPostSave._doc }
    },
  }
}