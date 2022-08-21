const Post = require('@models/postSchema')

module.exports = {
  Query: {
    getRecentPosts: async (_, { sort = 'new', offset = 0, limit = 10 }) => {
      const today = new Date()
      let calculatedDate = new Date()

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
        case "top:alltime":
          return await Post.aggregate([
            {
              $match: {
                createdAt: {
                  $lte: calculatedDate
                }
              }
            },
            {
              $addFields: {
                'totalNumbersOfVotes': {
                  $subtract: [{ $size: '$upvote' }, { $size: '$downvote' }]
                }
              },
            },

            { $sort: { 'totalNumbersOfVotes': -1 } },
            { $skip: offset },
            { $limit: limit }
          ])

        //? Sorting by new
        default:
          return await Post.aggregate([
            {
              $addFields: {
                'totalNumbersOfVotes': {
                  $subtract: [{ $size: '$upvote' }, { $size: '$downvote' }]
                }
              },
            },
            { $sort: { createdAt: -1 } },
            { $skip: offset },
            { $limit: limit }
          ])
      }

      //? Sort by top day, week, month, year
      return await Post.aggregate([
        {
          $match: {
            createdAt: {
              $gte: calculatedDate
            }
          }
        },
        {
          $addFields: {
            'totalNumbersOfVotes': {
              $subtract: [{ $size: '$upvote' }, { $size: '$downvote' }]
            }
          },
        },

        { $sort: { 'totalNumbersOfVotes': -1 } },
        { $skip: offset },
        { $limit: limit }
      ])
    }
  }
}