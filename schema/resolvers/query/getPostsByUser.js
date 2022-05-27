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

      let filterPost = user.post

      if (sort === 'hot') {
        return user.post.sort(sortByDesc('createdAt'))
      } else if (sort === 'top:alltime') {
        let filterPostSort = filterPost.sort(sortByDesc("totalNumOfVotes"))

        return filterPostSort
      } else if (sort === 'top:week') {
        filterPost = filterPost.filter(post => post.createdAt > Date.now() - 1000 * 3600 * 24 * 7)
          .sort(sortByDesc("totalNumOfVotes"))

        return filterPost
      } else if (sort === 'top:day') {
        filterPost = filterPost.filter(post => post.createdAt > Date.now() - 1000 * 3600 * 24)
          .sort(sortByDesc("totalNumOfVotes"))

        return filterPost
      } else if (sort === 'top:month') {
        filterPost = filterPost.filter(post => post.createdAt > Date.now() - 1000 * 3600 * 24 * 30)
          .sort(sortByDesc("totalNumOfVotes"))

        return filterPost
      }
    },
  }
}