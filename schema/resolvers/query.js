const User = require('@models/userSchema')
// const User = require('@/models/userSchema')
// const User = require('../../models/userSchema')

module.exports = {
  Query: {
    show: () => "laugh"
  },
  Post: {
    owner: async (parent) => {
      const loginUser = await User.findById(parent._id)

      // console.log('loginUser._doc', loginUser._doc)
      return loginUser
    }
  }
}