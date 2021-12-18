// const User = require('@models/userSchema')
const Subreddit = require('@models/subredditSchema')
const { sortByDesc } = require('@utils')
// const User = require('@/models/userSchema')
// const User = require('../../models/userSchema')

module.exports = {
  Query: {
    show: () => "laugh",
    getSubredditPost: async (_, { subredditId }) => {

      const subreddit = await Subreddit.findById(subredditId).populate('post')
      // return subreddit.post 
      // return subreddit.post.sort(sortBy('createdAt'))
      return subreddit.post.sort(sortByDesc('createdAt'))
    }

  },
  // Post: {
  //   owner: async (parent) => {
  //     const loginUser = await User.findById(parent._id)

  //     console.log('loginUser._doc', loginUser._doc)
  //     return loginUser
  //   }
  // },

}