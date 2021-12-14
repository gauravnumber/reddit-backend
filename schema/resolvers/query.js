const User = require('../../models/userSchema')

module.exports = {
  Query: {
    show: () => "laugh"
  },
  Post: {
    owner: async (parent) => {
      const loginUser = await User.findById(parent.id)

      console.log('loginUser._doc', loginUser._doc)
      // return loginUser._doc
    }
  }
}