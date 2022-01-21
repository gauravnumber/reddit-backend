const Comment = require('@models/commentSchema')

const checkAuth = require('@context/check-auth')

module.exports = {
  Mutation: {
    upvoteComment: async (_, { commentId }, context) => {
      const loginUser = checkAuth(context)

      const comment = await Comment.findById(commentId)

      //? If User already downvoted
      if (comment.downvote.some(userId => userId.toString() === loginUser._id)) {
        //? Remove downvote
        await Comment.findByIdAndUpdate(commentId, {
          downvote: comment.downvote.filter(userId => userId.toString() !== loginUser._id)
        }, { new: true })

      }

      //? If user already upvote
      if (comment.upvote.some(userId => userId.toString() === loginUser._id)) {
        //? Remove upvote
        const resultComment = await Comment.findByIdAndUpdate(commentId, {
          upvote: comment.upvote.filter(userId => userId.toString() !== loginUser._id)
        }, { new: true })

        return resultComment
      } else {
        //? User first time upvote
        const resultComment = await Comment.findByIdAndUpdate(commentId, {
          $push: {
            upvote: loginUser._id
          }
        }, { new: true })

        return resultComment
      }
    },
    downvoteComment: async (_, { commentId }, context) => {
      const loginUser = checkAuth(context)

      const comment = await Comment.findById(commentId)


      //? If User already upvoted
      if (comment.upvote.some(userId => userId.toString() === loginUser._id)) {
        //? Remove upvote
        await Comment.findByIdAndUpdate(commentId, {
          upvote: comment.upvote.filter(userId => userId.toString() !== loginUser._id)
        }, { new: true })
      }

      //? If user already downvote
      if (comment.downvote.some(userId => userId.toString() === loginUser._id)) {
        //? Remove downvote
        const resultComment = await Comment.findByIdAndUpdate(commentId, {
          downvote: comment.downvote.filter(userId => userId.toString() !== loginUser._id)
        }, { new: true })

        return resultComment

      } else {
        //? User first time downvote
        //? Downvote added
        const resultComment = await Comment.findByIdAndUpdate(commentId, {
          $push: {
            downvote: loginUser._id
          }
        }, { new: true })

        return resultComment
      }
    }
  }
}