const { sortByDesc } = require('@utils')

const Post = require('@models/postSchema')
const User = require('@models/userSchema')
const Subreddit = require('@models/subredditSchema')
// const Comment = require('@models/commentSchema')

module.exports = {
  Post: {
    // image: parent => {
    //   // return parent.image === undefined ? "yes" : parent?.image?.data
    //   return { data: parent?.image?.data, contentType: parent.image.contentType }
    //   // console.log('parent', parent)
    // },
    owner: async (parent) => {
      const loginUser = await User.findById(parent.owner)

      // console.log('loginUser', loginUser)
      // console.log('parent.owner', parent.owner)
      // console.log('parent', parent)

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
      })

      return post.comment.sort(sortByDesc("totalNumbersOfVotes"))
    },
    // createdAt: (parent) => {
    //   return parent.createdAt.toLocaleString('en-IN')
    // },
  }
}