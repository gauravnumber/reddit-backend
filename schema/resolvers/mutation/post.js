const crypto = require("crypto")
const path = require("path")
const fs = require("fs")
const checkAuth = require('@context/check-auth')

const Post = require('@models/postSchema')
const Subreddit = require('@models/subredditSchema')

module.exports = {
  Mutation: {
    post: async (_, { title, body, subredditName, image }, context) => {
      const loginUser = checkAuth(context)
      const subreddit = await Subreddit.findOne({ name: subredditName })

      if (image) {
        const { mimetype, createReadStream } = await image

        const extname = mimetype.split('/')[1]
        if (!['jpeg', 'png', 'webp', 'gif'].includes(extname)) {
          throw new Error("Only jpeg, jpg, png, webp, gif files supported.")
        }

        const stream = createReadStream()
        // const extname = path.extname(filename)
        const randomFileName = crypto.randomBytes(20).toString('hex')
        const imageName = `${randomFileName}.${extname}`
        const pathname = path.join("/home/gaurav/Documents/Practice/reddit/backend", "uploads", imageName)
        const writeStream = fs.createWriteStream(pathname)

        stream.pipe(writeStream)

        const post = new Post({
          title,
          body,
          image: {
            data: imageName,
            contentType: mimetype
          },
          owner: loginUser._id,
          subreddit: subreddit._id,
          upvote: [loginUser._id],
        })

        // console.log('post', post)
        return await post.save()


        //stream.on('data', (data) => {
        //   const post = new Post({
        //     title,
        //     body,
        //     image: {
        //       data,
        //       contentType: mimetype
        //     },
        //     owner: loginUser._id,
        //     subreddit: subreddit._id,
        //     upvote: [loginUser._id],
        //   })

        //   return await post.save()
        // })

        // console.log(await stream._events.data())
        // console.log(stream.emit('data'))
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