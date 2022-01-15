const User = require('@models/userSchema')
const Comment = require('@models/commentSchema')

module.exports = {
  Comment: {
    owner: async (parent) => {
      return await User.findById(parent.owner)
    }
  }
}