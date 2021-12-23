const User = require('@models/userSchema')

module.exports = {
  Query: {
    getPostsByUser: async (_, { username }) => {
      const user = await User.findOne({ username }).populate('post')

      return user.post
    },
  }
}