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
        const c = await Comment.findByIdAndUpdate(commentId, {
          downvote: comment.downvote.filter(userId => userId.toString() !== loginUser._id)
        }, { new: true })

        console.log(`upvote: remove downvote`, c)
      }

      //? If user already upvote
      if (comment.upvote.some(userId => userId.toString() === loginUser._id)) {
        //? Remove upvote
        const c = await Comment.findByIdAndUpdate(commentId, {
          upvote: comment.upvote.filter(userId => userId.toString() !== loginUser._id)
        }, { new: true })

        console.log(`upvote: remove upvote`, c)

        return "upvote: remove upvote"

      } else {
        //? User first time upvote
        console.log('not present')
        const c = await Comment.findByIdAndUpdate(commentId, {
          $push: {
            upvote: loginUser._id
          }
        }, { new: true })

        console.log(`c`, c)
        return 'first time upvote'
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

        // console.log(`downvote: remove upvote`, c)
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
        // console.log(`c`, c)
        // return 'first time downvote'
      }
    }
  }
}