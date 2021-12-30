const User = require('@models/userSchema')

module.exports = {
  Post: {
    owner: async (parent) => {
      // return parent + 'hello owner'
      // console.log(parent._id)
      // console.log('parent', parent)
      const loginUser = await User.findById(parent.owner)

      if (!loginUser) return { username: "u/deleted" };
      // if (!loginUser) console.log("***************************************************************************************************************************************************************************")
      // console.log(loginUser)

      // console.log('loginUser._doc', loginUser._doc)
      return loginUser
    },
    upvote: async (parent) => {
      const upvoteUser = []

      for (let index = 0; index < parent.upvote.length; index++) {
        upvoteUser.push(await User.findById(parent.upvote[index]))
      }

      return upvoteUser
    },
    downvote: async (parent) => {
      const downvoteUser = []

      for (let index = 0; index < parent.downvote.length; index++) {
        downvoteUser.push(await User.findById(parent.downvote[index]))
      }

      return downvoteUser
    },
    vote: async (parent) => {
      const voteUser = []

      for (let index = 0; index < parent.vote.length; index++) {
        voteUser.push(await User.findById(parent.vote[index]))
      }

      return voteUser
    },

    totalNumOfVote: (parent) => {
      return parent.upvote.length - parent.downvote.length
    }

  }
}