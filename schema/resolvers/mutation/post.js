const fs = require("fs")
const crypto = require("crypto")
const path = require('path')
const checkAuth = require('@context/check-auth')

const Post = require('@models/postSchema')
const Subreddit = require('@models/subredditSchema')
const User = require('@models/userSchema')

module.exports = {
  Mutation: {
    post: async (_, { title, body, subredditName, image }, context) => {
      const loginUser = checkAuth(context)
      let post

      console.log('image', image)
      if (image) {
        const { filename, mimetype, createReadStream } = await image
        const stream = createReadStream()
        const extname = path.extname(filename)
        const randomFileName = crypto.randomBytes(20).toString('hex')
        const pathname = path.join("/home/gaurav/Documents/Practice/reddit/backend", "uploads", `${randomFileName}${extname}`)
        const writeStream = fs.createWriteStream(pathname)

        stream.pipe(writeStream)

        post = new Post({
          title,
          body,
          image: {
            data: fs.readFileSync(pathname),
            contentType: mimetype
          },
          owner: loginUser._id,
          subreddit: subreddit._id,
          upvote: [loginUser._id],
        })

        fs.unlinkSync(pathname)
      }


      const subreddit = await Subreddit.findOne({ name: subredditName })

      post = new Post({
        title,
        body,
        owner: loginUser._id,
        subreddit: subreddit._id,
        upvote: [loginUser._id],
      })

      const newPost = await post.save()

      // fs.unlinkSync(pathname)
      return newPost
    },

  }
}