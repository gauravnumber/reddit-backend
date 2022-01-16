const User = require('@models/userSchema')
const Comment = require('@models/commentSchema')

module.exports = {
  Comment: {
    owner: async (parent) => {
      return await User.findById(parent.owner)
    },
    comment: async (parent) => {
      const parentComment = await Comment.findById(parent._id).populate('comment')

      return parentComment.comment
    }
  }
}