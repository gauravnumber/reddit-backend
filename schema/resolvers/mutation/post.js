const checkAuth = require('@context/check-auth')

const Post = require('@models/postSchema')
const Subreddit = require('@models/subredditSchema')

module.exports = {
  Mutation: {
    post: async (_, { title, body, subreddit }, context) => {
      const loginUser = checkAuth(context)

      const post = new Post({
        title,
        body,
        owner: loginUser._id,
        createdAt: new Date().toISOString(),
        subreddit,
      })

      const newPost = await post.save()

      // refactoring findByIdAndUpdate
      // const subredditId = await Subreddit.findById(subreddit)
      await Subreddit.findByIdAndUpdate(subreddit, {
        $push: {
          post: newPost._id
        }
      })

      return newPost
    },

  }
}