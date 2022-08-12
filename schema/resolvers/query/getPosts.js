const { sortByDesc } = require('@utils')

const User = require('@models/userSchema')
const Post = require('@models/postSchema')
const Subreddit = require('@models/subredditSchema')

module.exports = {
  Query: {
    getPosts: async (_, { username, subredditName, sort, offset = 0, limit = 3, type }) => {
      let post;

      switch (type) {
        case "recent":
          // post = await Post.find()
          // post = await Post.find().where({
          //   createdAt: {
          //     $gte: new Date(2022, 7, 9)
          //   }
          // })

          return await Post.aggregate([
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

          break

        case "user":
          if (!username) throw new Error("Incorrect username.")

          const user = await User.findOne(
            { username },
          ).populate('post')

          // let filterPost = user.post
          // return filterPost

          post = user.post
          // return post
          break;

        case "subreddit":
          if (!subredditName) throw new Error("Incorrect subreddit name.")

          const subreddit = await Subreddit.findOne({ username }).populate('post')
          post = subreddit.post
          break

        default: throw new Error("Wrong type sended.")
      }

      let filterPost

      if (sort === 'top:alltime') {
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

      //? Sort by new
      return post.sort(sortByDesc('createdAt')).slice(offset, offset + limit)
    }
  }
}