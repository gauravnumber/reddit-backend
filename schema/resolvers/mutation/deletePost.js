const checkAuth = require('@context/check-auth')

const Subreddit = require('@models/subredditSchema')
const User = require('@models/userSchema')
const Post = require('@models/postSchema')

module.exports = {
  Mutation: {
    deletePost: async (_, { username, subredditName, postId }, context) => {
      const loginUser = checkAuth(context)
      const post = await Post.findById(postId).populate('owner')

      if (post.owner.username === loginUser.username) {
        const subreddit = await Subreddit.findOne({ name: subredditName })
        await Subreddit.findOneAndUpdate({ name: subredditName }, { post: subreddit.post.filter(pId => pId.toString() != postId) })

        const user = await User.findById(loginUser._id)
        await User.findByIdAndUpdate(loginUser._id, {
          post: user.post.filter(pId => pId.toString() !== postId)
        })

        await Post.findByIdAndDelete(postId)

        return "authorized person delete"
      }

      return "unauthorized"
    },
  }
}