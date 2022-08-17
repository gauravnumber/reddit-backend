const checkAuth = require('@context/check-auth')

const Post = require('@models/postSchema')
const Subreddit = require('@models/subredditSchema')

module.exports = {
  Mutation: {
    post: async (_, { title, body, subredditName, image }, context) => {
      const loginUser = checkAuth(context)
      const subreddit = await Subreddit.findOne({ name: subredditName })

      if (image) {
        const { filename, mimetype, createReadStream } = await image
        const stream = createReadStream()
        stream.on('data', async data => {
          const post = new Post({
            title,
            body,
            image: {
              data,
              contentType: mimetype
            },
            owner: loginUser._id,
            subreddit: subreddit._id,
            upvote: [loginUser._id],
          })
          return await post.save()
        })
      } else {
        const post = new Post({
          title,
          body,
          owner: loginUser._id,
          subreddit: subreddit._id,
          upvote: [loginUser._id],
        })

        return await post.save()
      }
    }
  }
}