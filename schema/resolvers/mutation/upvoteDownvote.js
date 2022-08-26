const Post = require('@models/postSchema')
const checkAuth = require('@context/check-auth')

module.exports = {
  Mutation: {
    upvote: async (_, { postId }, context) => {
      const loginUser = checkAuth(context)
      const post = await Post.findById(postId)

      //? already upvoted, remove postId
      if (post.upvote.includes(loginUser._id)) {
        return await Post.findByIdAndUpdate(postId, {
          $pull: {
            upvote: {
              $in: [loginUser._id]
            }
          }
        }, { new: true })
      } else if (post.downvote.includes(loginUser._id)) {
        //? remove downvote
        await Post.findByIdAndUpdate(postId, {
          $pull: {
            downvote: {
              $in: [loginUser._id]
            }
          }
        }, { new: true })
      }

      //? add upvote
      return await Post.findByIdAndUpdate(postId, {
        $push: {
          upvote: loginUser._id
        }
      }, { new: true })
    },

    downvote: async (_, { postId }, context) => {
      let downvotedPost
      const loginUser = checkAuth(context)

      const post = await Post.findById(postId)
      //? already downvoted, remove postId
      if (post.downvote.includes(loginUser._id)) {
        return await Post.findByIdAndUpdate(postId, {
          $pull: {
            downvote: {
              $in: [loginUser._id]
            }
          }
        }, { new: true })
      } else if (post.upvote.includes(loginUser._id)) {
        //? remove upvote
        await Post.findByIdAndUpdate(postId, {
          $pull: {
            upvote: {
              $in: [loginUser._id]
            }
          }
        }, { new: true })
      }

      //? add downvote
      return await Post.findByIdAndUpdate(postId, {
        $push: {
          downvote: loginUser._id
        }
      }, { new: true })
    },
  }
}