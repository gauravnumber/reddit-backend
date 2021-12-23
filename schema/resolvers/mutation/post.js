const checkAuth = require('@context/check-auth')

const Post = require('@models/postSchema')
const Subreddit = require('@models/subredditSchema')

module.exports = {
  Mutation: {
    post: async (_, { title, body, subredditName }, context) => {
      const loginUser = checkAuth(context)

      const subreddit = await Subreddit.findOne({ name: subredditName })

      const post = new Post({
        title,
        body,
        owner: loginUser._id,
        createdAt: new Date().toISOString(),
        subreddit: subreddit._id,
        vote: [loginUser._id],
        upvote: [loginUser._id],
      })

      const newPost = await post.save()

      await Subreddit.findByIdAndUpdate(subreddit._id, {
        $push: {
          post: newPost._id
        }
      })

      return newPost
    },

  }
}