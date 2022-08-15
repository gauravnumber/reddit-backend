const { AuthenticationError } = require('apollo-server-express')
const checkAuth = require('@context/check-auth')

// const Post = require('@models/postSchema')
const Comment = require('@models/commentSchema')

module.exports = {
  Mutation: {
    setComment: async (_, { postId, commentId, body }, context) => {
      const user = checkAuth(context)
      let comment

      if (commentId) {
        comment = new Comment({
          body,
          owner: user._id,
          upvote: [user._id],
          parentPost: postId,
          parentComment: commentId,
          createdAt: new Date().toISOString(),
        })
      } else {
        comment = new Comment({
          body,
          owner: user._id,
          upvote: [user._id],
          parentPost: postId,
          createdAt: new Date().toISOString(),
        })
      }

      // const comment = postId !== undefined ? new Comment({
      //   body,
      //   owner: user._id,
      //   parentPost: postId,
      //   createdAt: new Date().toISOString(),
      // }) : new Comment({
      //   body,
      //   owner: user._id,
      //   parentComment: commentId,
      //   createdAt: new Date().toISOString(),
      // })

      // console.log('comment', comment)

      // comment.save(async (err, doc) => {
      //   if (err) return new Error(err)

      //   if (commentId) {
      //     await Comment.findByIdAndUpdate(commentId, {
      //       $push: {
      //         comment: doc._id
      //       }
      //     })
      //   } else if (postId) {
      //     console.log('post id')
      //     // await Post.findByIdAndUpdate(postId, {
      //     //   $push: {
      //     //     comment: doc._id
      //     //   }
      //     // })
      //   }
      // })
      // return comment

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