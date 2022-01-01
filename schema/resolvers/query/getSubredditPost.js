const Subreddit = require('@models/subredditSchema')
const { sortByDesc } = require('@utils')

module.exports = {
  Query: {
    // getSubredditPost: async (_, { subredditId, sort = 'hot' }) => {
    getSubredditPost: async (_, { name, sort = 'hot' }) => {
      const subreddit = await Subreddit.findOne({ name }).populate('post')

      if (sort === 'hot') {
        return subreddit.post.sort(sortByDesc('createdAt'))
      } else if (sort === 'top:alltime') {
        let filterPost = subreddit.post

        let filterPostSort = filterPost.sort(sortByDesc("totalNumOfVotes"))

        return filterPostSort
      } else if (sort === 'top:week') {
        let filterPost = subreddit.post

        filterPost = filterPost.filter(post => post.createdAt > Date.now() - 1000 * 3600 * 24 * 7)
          .sort(sortByDesc("totalNumOfVotes"))

        return filterPost
      } else if (sort === 'top:day') {
        let filterPost = subreddit.post

        filterPost = filterPost.filter(post => post.createdAt > Date.now() - 1000 * 3600 * 24)
          .sort(sortByDesc("totalNumOfVotes"))

        return filterPost
      } else if (sort === 'top:month') {
        let filterPost = subreddit.post

        filterPost = filterPost.filter(post => post.createdAt > Date.now() - 1000 * 3600 * 24 * 7 * 30)
          .sort(sortByDesc("totalNumOfVotes"))

        return filterPost
      }
    }

  }
}