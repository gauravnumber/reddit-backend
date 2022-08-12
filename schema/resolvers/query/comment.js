const { sortByDesc } = require('@utils')

const User = require('@models/userSchema')
const Comment = require('@models/commentSchema')

module.exports = {
  Comment: {
    owner: async (parent) => {
      const user = await User.findById(parent.owner)

      if (!user) {
        // console.log('user', user)
        return { _id: parent.owner, username: "deleted" }
      }

      return user
    },
    comment: async (parent) => {
      const parentComment = await Comment.findById(parent._id).populate({
        path: 'comment',
        // sort: {
        //   totalNumOfVotes: -1,
        // }
        //  match: {
        //   totalNumOfVotes: {
        //     $gt: 0
        //   }
        // }
      })
      // .sort({
      //   totalNumOfVotes: -1
      // })

      // console.log(`parentComment`, parentComment)

      return parentComment.comment.sort(sortByDesc("totalNumOfVotes"))
      // return parentComment.comment
    },
    upvote: async (parent) => {
      const comment = await Comment.findById(parent._id).populate({
        path: 'upvote',
        // select: 'upvote'
      })

      // if (!user) {
      //   return {
      //     _id: parent.owner, owner: {
      //       username: "deleted"
      //     }
      //   }
      // }

      return comment.upvote
    },

    downvote: async (parent) => {
      const comment = await Comment.findById(parent._id).populate('downvote')

      // if (!user) {
      //   return {
      //     _id: parent.owner, owner: {
      //       username: "deleted"
      //     }
      //   }
      // }

      return comment.downvote
    },
    createdAt: (parent) => {
      return parent.createdAt.toLocaleString('en-IN')
    },

  }
}