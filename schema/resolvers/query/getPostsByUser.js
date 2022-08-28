const { sortByDesc } = require('@utils')

const User = require('@models/userSchema')

module.exports = {
  Query: {
    getPostsByUser: async (_, { username, sort = 'new', offset = 0, limit = 10 }) => {
      const today = new Date()
      const calculatedDate = new Date()

      let user

      switch (sort) {
        case "top:day":
          calculatedDate.setDate(today.getDate() - 1)
          break;
        case "top:week":
          calculatedDate.setDate(today.getDate() - 7)
          break;
        case "top:month":
          calculatedDate.setMonth(today.getMonth() - 1)
          break;
        case "top:year":
          calculatedDate.setFullYear(today.getFullYear() - 1)
          break;

        case "top:alltime": break;

        //? Sorting by new
        default:
          user = await User.findOne({ username })
            .populate({
              path: 'post',
              options: { sort: { createdAt: -1 } },
              // populate: {
              //   path: 'comment',
              // }
            })

          return user.post.slice(offset, offset + limit)
      }

      if (sort === 'top:alltime') {
        user = await User.findOne({ username }).populate({
          path: 'post',
        })
      } else {
        user = await User.findOne({ username }).populate({
          path: 'post',
          match: {
            createdAt: {
              $gte: calculatedDate
            }
          }
        })
      }

      let filterPost = user.post
      let filterPostSort = filterPost.sort(sortByDesc("totalNumbersOfVotes"))

      return filterPostSort.slice(offset, offset + limit)


      //   let filterPost = user.post

      //   if (sort === 'top:alltime') {
      //     let filterPostSort = filterPost.sort(sortByDesc("totalNumbersOfVotes"))

      //     return filterPostSort.slice(offset, offset + limit)
      //   } else if (sort === 'top:week') {
      //     filterPost = filterPost.filter(post => post.createdAt > Date.now() - 1000 * 3600 * 24 * 7)
      //       .sort(sortByDesc("totalNumbersOfVotes"))

      //     return filterPost.slice(offset, offset + limit)
      //   } else if (sort === 'top:day') {
      //     filterPost = filterPost.filter(post => post.createdAt > Date.now() - 1000 * 3600 * 24)
      //       .sort(sortByDesc("totalNumbersOfVotes"))

      //     return filterPost.slice(offset, offset + limit)
      //   } else if (sort === 'top:month') {
      //     filterPost = filterPost.filter(post => post.createdAt > Date.now() - 1000 * 3600 * 24 * 30)
      //       .sort(sortByDesc("totalNumbersOfVotes"))

      //     return filterPost.slice(offset, offset + limit)
      //   }

      //   //? Sort by new
      //   return user.post.sort(sortByDesc('createdAt')).slice(offset, offset + limit)
    }

  }
}