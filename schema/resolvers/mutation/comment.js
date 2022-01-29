const checkAuth = require('@context/check-auth')

const Post = require('@models/postSchema')
const Comment = require('@models/commentSchema')

module.exports = {
  Mutation: {
    setComment: async (_, { postId, commentId, body }, context) => {
      const user = checkAuth(context)

      if (!postId && !commentId) throw new Error("Provide one id, postId or commentId")

      const comment = new Comment({
        body,
        owner: user._id
      })

      comment.save(async (err, doc) => {
        if (err) return new Error(err)

        if (commentId) {
          await Comment.findByIdAndUpdate(commentId, {
            $push: {
              comment: doc._id
            }
          })
        } else if (postId) {
          await Post.findByIdAndUpdate(postId, {
            $push: {
              comment: doc._id
            }
          })
        }
      })

      return comment
    },

    deleteComment: async (_, { commentId }, context) => {
      let comment
      const loginUser = checkAuth(context)

      const findComment = await Comment.findById(commentId)

      if (!findComment) {
        return ({
          // ? generate new id
          _id: "deleted",
          body: "deleted"
        })
      }


      if (findComment.owner._id.toString() === loginUser._id) {
        comment = await Comment.findByIdAndDelete(commentId)

        return comment
      } else {
        throw new Error("You unauthorized to delete this comment.")
      }
    },
  }
}