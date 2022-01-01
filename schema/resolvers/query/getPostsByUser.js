const { sortByDesc } = require('@utils')

const User = require('@models/userSchema')

module.exports = {
  Query: {
    getPostsByUser: async (_, { username, sort = 'hot' }) => {
      const user = await User.findOne(
        { username },
        // {
        //   $and: [
        //     {
        //       "createdAt": {
        //         $lte: new Date().toISOString
        //       }
        //     },
        //     { username }
        //   ]
        // }
        // ).limit(1).populate('post')
      ).populate('post')

      if (sort === 'hot') {
        return user.post.sort(sortByDesc('createdAt'))
      } else if (sort === 'top:alltime') {
        let filterPost = user.post.filter(p => p.upvote.length > 0)

        let filterPostSort = filterPost.sort((a, b) => (a['upvote'].length > b['upvote'].length) ? -1 : 1)

        return filterPostSort
      } else if (sort === 'top:week') {
        let filterPost = user.post

        filterPost = filterPost.filter(post => post.createdAt > Date.now() - 1000 * 3600 * 24 * 7)
          .filter(p => p.upvote.length > 0).sort((a, b) => b.upvote.length - a.upvote.length)

        return filterPost
      } else if (sort === 'top:day') {
        let filterPost = user.post

        filterPost = filterPost.filter(post => post.createdAt > Date.now() - 1000 * 3600 * 24)
          .filter(p => p.upvote.length > 0).sort((a, b) => b.upvote.length - a.upvote.length)

        return filterPost
      } else if (sort === 'top:month') {
        let filterPost = user.post

        filterPost = filterPost.filter(post => post.createdAt > Date.now() - 1000 * 3600 * 24 * 7 * 30)
          .filter(p => p.upvote.length > 0).sort((a, b) => b.upvote.length - a.upvote.length)

        return filterPost
      }

      return user.post
    },
  }
}