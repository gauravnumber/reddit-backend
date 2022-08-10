const { sortByDesc } = require('@utils')

const Post = require('@models/postSchema')
const User = require('@models/userSchema')
const Subreddit = require('@models/subredditSchema')
// const Comment = require('@models/commentSchema')

module.exports = {
  Post: {
    owner: async (parent) => {
      const loginUser = await User.findById(parent.owner)

      if (!loginUser) return { username: "deleted" };

      return loginUser
    },
    upvote: async (parent) => {
      const upvoteUser = []

      for (let index = 0; index < parent.upvote.length; index++) {
        const user = await User.findById(parent.upvote[index])
        if (!user) {
          upvoteUser.push({ username: "deleted" })
          continue
        }
        upvoteUser.push(user)
      }

      return upvoteUser
    },
    downvote: async (parent) => {
      const downvoteUser = []

      for (let index = 0; index < parent.downvote.length; index++) {
        const user = await User.findById(parent.downvote[index])

        if (!user) {
          downvoteUser.push({ username: "deleted" })
          continue
        }

        downvoteUser.push(user)
      }

      return downvoteUser
    },
    // vote: async (parent) => {
    //   const voteUser = []

    //   for (let index = 0; index < parent.vote.length; index++) {
    //     const user = await User.findById(parent.vote[index])

    //     if (!user) {
    //       voteUser.push({ username: "deleted" })
    //       continue
    //     }

    //     voteUser.push(user)
    //   }

    //   return voteUser
    // },

    // totalNumOfVotes: (parent) => {
    //   return parent.upvote.length - parent.downvote.length
    // },

    subreddit: async (parent) => {
      const subreddit = await Subreddit.findById(parent.subreddit)

      if (!subreddit) {
        return ({ name: "deleted" })
      }

      return subreddit

    },

    comment: async (parent) => {
      const post = await Post.findById(parent._id).populate({
        path: 'comment',
        // match: {
        //   totalNumOfVotes: {
        //     $eq: 1
        //   }
        // },
        // sort: {
        //   totalNumOfVotes: -1
        // }
        // select: "upvote downvote"

        // populate: 'comment'
      })

      // console.log('post', post)
      return post.comment.sort(sortByDesc("totalNumOfVotes"))
      // return post.comment
      // console.log('post.comment', post.comment)
    },
    createdAt: (parent) => {
      return parent.createdAt.toLocaleString('en-IN')
    }

  }
}