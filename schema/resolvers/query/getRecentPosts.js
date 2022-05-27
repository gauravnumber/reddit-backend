const { sortByDesc } = require('@utils')

const Post = require('@models/postSchema')

module.exports = {
  Query: {
    getRecentPosts: async (_, { sort }) => {
      const post = await Post.find()

      let filterPost

      if (sort === 'hot') {
        return post.sort(sortByDesc('createdAt'))
      } else if (sort === 'top:alltime') {
        let filterPostSort = post.sort(sortByDesc("totalNumOfVotes"))

        return filterPostSort
      } else if (sort === 'top:week') {
        filterPost = post.filter(post => post.createdAt > Date.now() - 1000 * 3600 * 24 * 7)
          .sort(sortByDesc("totalNumOfVotes"))

        return filterPost
      } else if (sort === 'top:day') {
        filterPost = post.filter(post => post.createdAt > Date.now() - 1000 * 3600 * 24)
          .sort(sortByDesc("totalNumOfVotes"))

        return filterPost
      } else if (sort === 'top:month') {
        filterPost = post.filter(post => post.createdAt > Date.now() - 1000 * 3600 * 24 * 30)
          .sort(sortByDesc("totalNumOfVotes"))

        return filterPost
      }

      return post
    }
  }
}