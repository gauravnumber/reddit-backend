const { AuthenticationError } = require('apollo-server-express')
const checkAuth = require('@context/check-auth')
const Comment = require('@models/commentSchema')

module.exports = {
  Mutation: {
    setComment: async (_, { postId, commentId, body, image }, context) => {
      const user = checkAuth(context)
      let comment

      console.log('image', image)

      //? comment on comment
      if (commentId) {
        if (image) {
          const { mimetype, createReadStream } = await image

          const stream = createReadStream()
          stream.on('data', async data => {
            comment = new Comment({
              body,
              image: {
                data,
                contentType: mimetype
              },
              owner: user._id,
              upvote: [user._id],
              parentPost: postId,
              parentComment: commentId,
            })

            return await comment.save()
          })
          return
        } else {
          //? without image
          comment = new Comment({
            body,
            owner: user._id,
            upvote: [user._id],
            parentPost: postId,
            parentComment: commentId,
          })

        }
      } else {
        //? comment on post
        if (image) {
          const { mimetype, createReadStream } = await image
          const stream = createReadStream()
          stream.on('data', async data => {
            comment = new Comment({
              body,
              image: {
                data,
                contentType: mimetype
              },
              owner: user._id,
              upvote: [user._id],
              parentPost: postId,
            })

            return await comment.save()
          })
          return
        } else {
          //? comment on post without image
          comment = new Comment({
            body,
            owner: user._id,
            upvote: [user._id],
            parentPost: postId,
          })
        }
      }

      return await comment.save()
    },

    deleteComment: async (_, { commentId }, context) => {
      let comment
      const loginUser = checkAuth(context)

      const findComment = await Comment.findById(commentId)

      if (!findComment) {
        return ({
          _id: commentId,
          body: "deleted"
        })
      }


      if (findComment.owner._id.toString() === loginUser._id) {
        comment = await Comment.findByIdAndDelete(commentId)

        return comment
      } else {
        throw new AuthenticationError("You unauthorized to delete this comment.")
      }
    },
  }
}