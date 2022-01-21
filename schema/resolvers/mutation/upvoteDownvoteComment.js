const Comment = require('@models/commentSchema')

const checkAuth = require('@context/check-auth')

module.exports = {
  Mutation: {
    upvoteComment: async (_, { commentId }, context) => {
      const loginUser = checkAuth(context)

      const comment = await Comment.findById(commentId)

      //? If user already upvote
      if (comment.upvote.some(userId => userId.toString() === loginUser._id)) {
        console.log('present')

        //? If user downvote this comment then remove
        if (comment.downvote.some(userId => userId.toString() === loginUser._id)) {
          const c = await Comment.findByIdAndUpdate(commentId, {
            downvote: comment.downvote.filter(userId => userId.toString() !== loginUser._id)
          }, { new: true })

          console.log(`downvote removed`, c)
        }

        //? Do first time vote
        const c = await Comment.findByIdAndUpdate(commentId, {
          upvote: comment.upvote.filter(userId => userId.toString() !== loginUser._id)
        }, { new: true })

        console.log(`c`, c)

        return "user already upvote"

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


      console.log(`comment`, comment)
      console.log(`loginUser._id`, loginUser._id)

      return `comment id: ${commentId}`
    }
  }
}