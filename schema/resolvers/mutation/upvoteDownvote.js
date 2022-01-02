const Post = require('@models/postSchema')

const checkAuth = require('@context/check-auth')

module.exports = {
  Mutation: {
    upvote: async (_, { postId }, context) => {
      let upvotedPost
      const loginUser = checkAuth(context)

      const post = await Post.findById(postId)

      //? First time vote
      if (!post.vote.includes(loginUser._id)) {
        upvotedPost = await Post.findByIdAndUpdate(postId, {
          upvote: post.upvote.concat(loginUser._id),
          vote: post.vote.concat(loginUser._id)
        }, { new: true })

        // return 'First time voted and upvoted.'
        return upvotedPost
      }

      // already downvoted or already upvoted

      //? voted & remove downvote 
      if (post.downvote.includes(loginUser._id)) {
        upvotedPost = await Post.findByIdAndUpdate(postId, {
          downvote: post.downvote.filter(downvotedUserId => downvotedUserId.toString() !== loginUser._id),
          upvote: post.upvote.concat(loginUser._id)
        }, { new: true })

        // return 'Remove downvote. Upvote this post.'
        return upvotedPost
      }

      //? already upvoted
      if (post.upvote.includes(loginUser._id)) {
        upvotedPost = await Post.findByIdAndUpdate(postId, {
          upvote: post.upvote.filter(upvoteUserId => upvoteUserId.toString() !== loginUser._id),
          vote: post.vote.filter(voteUserId => voteUserId.toString() !== loginUser._id)
        }, { new: true })

        // return 'already upvoted post, remove upvote'
        return upvotedPost
      }

      return 'upvote: this line should not occur'
    },

    downvote: async (_, { postId }, context) => {
      let downvotedPost
      const loginUser = checkAuth(context)

      const post = await Post.findById(postId)

      //? First time vote
      if (!post.vote.includes(loginUser._id)) {
        downvotedPost = await Post.findByIdAndUpdate(postId, {
          downvote: post.downvote.concat(loginUser._id),
          vote: post.vote.concat(loginUser._id)
        }, { new: true })

        // return 'First time voted and downvoted.'
        return downvotedPost
      }


      //? upvoted & remove upvoted 
      if (post.upvote.includes(loginUser._id)) {
        downvotedPost = await Post.findByIdAndUpdate(postId, {
          upvote: post.upvote.filter(upvotedUserId => upvotedUserId.toString() !== loginUser._id),
          downvote: post.downvote.concat(loginUser._id)
        }, { new: true })

        // return 'Remove upvote. Downvote this post.'
        return downvotedPost
      }

      //? already downvoted

      if (post.downvote.includes(loginUser._id)) {
        downvotedPost = await Post.findByIdAndUpdate(postId, {
          downvote: post.downvote.filter(downvoteUserId => downvoteUserId.toString() !== loginUser._id),
          vote: post.vote.filter(voteUserId => voteUserId.toString() !== loginUser._id)
        }, { new: true })

        // return 'already downvoted post, remove downvote'
        return downvotedPost
      }

      return 'this line should not occur'
    },

  }
}