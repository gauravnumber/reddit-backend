const User = require('@models/userSchema')
const Comment = require('@models/commentSchema')

module.exports = {
  Comment: {
    owner: async (parent) => {
      const user = await User.findById(parent.owner)

      if (!user) {
        // console.log('user', user)
        return { _id: parent.owner, username: "deleted" }
      }

      return user
    },
    comment: async (parent) => {
      const parentComment = await Comment.findById(parent._id).populate('comment')

      return parentComment.comment
    }
  }
}