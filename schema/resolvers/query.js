// const User = require('@models/userSchema')
const Subreddit = require('@models/subredditSchema')
const { sortByDesc } = require('@utils')
const User = require('@models/userSchema')
// const User = require('../../models/userSchema')

module.exports = {
  Query: {
    show: () => "laugh",
    getSubredditPost: async (_, { subredditId, sort = 'hot' }) => {
      const subreddit = await Subreddit.findById(subredditId).populate('post')

      if (sort === 'hot') {
        return subreddit.post.sort(sortByDesc('createdAt'))
      } else if (sort === 'top:alltime') {
        let filterPost = subreddit.post.filter(p => p.upvote.length > 0)

        let filterPostSort = filterPost.sort((a, b) => (a['upvote'].length > b['upvote'].length) ? -1 : 1)

        return filterPostSort
      } else if (sort === 'top:week') {
        let filterPost = subreddit.post

        filterPost = filterPost.filter(post => post.createdAt > Date.now() - 1000 * 3600 * 24 * 7)
          .filter(p => p.upvote.length > 0).sort((a, b) => b.upvote.length - a.upvote.length)

        return filterPost
      } else if (sort === 'top:day') {
        let filterPost = subreddit.post

        filterPost = filterPost.filter(post => post.createdAt > Date.now() - 1000 * 3600 * 24)
          .filter(p => p.upvote.length > 0).sort((a, b) => b.upvote.length - a.upvote.length)

        return filterPost
      } else if (sort === 'top:month') {
        let filterPost = subreddit.post

        filterPost = filterPost.filter(post => post.createdAt > Date.now() - 1000 * 3600 * 24 * 7 * 30)
          .filter(p => p.upvote.length > 0).sort((a, b) => b.upvote.length - a.upvote.length)

        return filterPost
      }
    }

  },
  Post: {
    owner: async (parent) => {
      // return parent + 'hello owner'
      // console.log(parent._id)
      // console.log('parent', parent)
      const loginUser = await User.findById(parent.owner)

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
  },

}