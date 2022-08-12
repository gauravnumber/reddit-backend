const Subreddit = require('@models/subredditSchema')
const { sortByDesc } = require('@utils')

module.exports = {
  Query: {
    getSubredditPost: async (_, { name, sort = "new", offset = 0, limit = 10 }) => {
      const today = new Date()
      const calculatedDate = new Date()
      let subreddit

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
          subreddit = await Subreddit.findOne({ name })
            .populate({
              path: 'post',
              options: { sort: { createdAt: -1 } }
            })

          return subreddit.post.slice(offset, offset + limit)
      }

      if (sort === 'top:alltime') {
        subreddit = await Subreddit.findOne({ name })
          .populate({
            path: 'post',
          })

      } else {
        subreddit = await Subreddit.findOne({ name })
          .populate({
            path: 'post',
            match: {
              createdAt: {
                $gte: calculatedDate
              }
            }
          })

      }

      let filterPost = subreddit.post
      let filterPostSort = filterPost.sort(sortByDesc("totalNumbersOfVotes"))

      return filterPostSort.slice(offset, offset + limit)
    }
  }
}