// const User = require('@models/userSchema')
const Subreddit = require('@models/subredditSchema')
const { sortByDesc } = require('@utils')
// const User = require('@/models/userSchema')
// const User = require('../../models/userSchema')

module.exports = {
  Query: {
    show: () => "laugh",
    getSubredditPost: async (_, { subredditId, sort = 'hot' }) => {

      const subreddit = await Subreddit.findById(subredditId).populate('post')
      // return subreddit.post 
      // return subreddit.post.sort(sortBy('createdAt'))
      if (sort === 'hot') {
        return subreddit.post.sort(sortByDesc('createdAt'))
      } else if (sort === 'top') {
        // console.log('subreddit.post', subreddit.post)
        let filterPost = subreddit.post.filter(p => p.upvote.length > 0)

        let filterPostSort = filterPost.sort((a, b) => (a['upvote'].length > b['upvote'].length) ? -1 : 1)

        return filterPostSort
        // return subreddit.post
      }
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