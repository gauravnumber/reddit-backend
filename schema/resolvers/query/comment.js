const { sortByDesc } = require('@utils')

const User = require('@models/userSchema')
const Comment = require('@models/commentSchema')

module.exports = {
  Comment: {
    owner: async (parent) => {
      const user = await User.findById(parent.owner)

      if (!user) {
        return { _id: parent.owner, username: "deleted" }
      }

      return user
    },
    comment: async (parent) => {
      console.log('parent', parent)
      const parentComment = await Comment.findById(parent._id).populate({
        path: 'comment',
      })

      return parentComment.comment.sort(sortByDesc("totalNumbersOfVotes"))
    },
    upvote: async (parent) => {
      const comment = await Comment.findById(parent._id).populate({
        path: 'upvote',
      })

      return comment.upvote
    },

    downvote: async (parent) => {
      const comment = await Comment.findById(parent._id).populate('downvote')
      return comment.downvote
    },
    createdAt: (parent) => {
      return parent.createdAt.toLocaleString('en-IN')
    },
  }
}