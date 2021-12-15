const { AuthenticationError, UserInputError } = require('apollo-server')

const checkAuth = require('@context/check-auth')

const User = require('@models/userSchema')
const Post = require('@models/postSchema')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  Mutation: {
    register: async (_, { username, password }) => {
      const passwordHash = await bcrypt.hash(password, 12)

      const newUser = new User({
        username,
        passwordHash,
      })

      const res = await newUser.save()

      const token = jwt.sign({
        _id: res._id,
        username: res.username,
      }, 'SECRET')

      return { token, ...res._doc }
      // return { id: res._id, token, ...res._doc }
    },

    login: async (_, { username, password }) => {
      const user = await User.findOne({ username })

      if (!user) {
        throw new UserInputError("Username is not registered.")
      }

      const isPassword = await bcrypt.compare(password, user.passwordHash)

      if (!isPassword) {
        throw new AuthenticationError('Password is incorrect.')
      }

      const token = jwt.sign({
        _id: user._id,
        username: user.username,
      }, 'SECRET')

      return { token, ...user._doc }
      // return { id: user._id, token, ...user._doc }
    },

    post: async (_, { title, body }, context) => {
      const loginUser = checkAuth(context)

      const newPost = await Post({
        title,
        body,
        owner: loginUser._id,
        createdAt: new Date().toISOString(),
      })

      const newPostSave = await newPost.save()

      // console.log('newPostSave._doc', newPostSave._doc)

      return { ...newPostSave._doc }
      // return { id: newPostSave._id, ...newPostSave._doc }
    },

    upvote: async (_, { postId }, context) => {
      let upvotedPost

      const loginUser = checkAuth(context)

      const post = await Post.findById(postId)

      // First time vote
      if (!post.vote.includes(loginUser._id)) {
        upvotedPost = await Post.findByIdAndUpdate(postId, {
          upvote: post.upvote.concat(loginUser._id),
          vote: post.vote.concat(loginUser._id)
        })

        // return 'First time voted and upvoted.'
        return upvotedPost
      }

      // already downvoted or already upvoted

      // remove downvote 
      if (post.downvote.includes(loginUser._id)) {
        upvotedPost = await Post.findByIdAndUpdate(postId, {
          downvote: post.upvote.filter(upvotedUserId => upvotedUserId.toString() !== loginUser._id),
          upvote: post.upvote.concat(loginUser._id)
        })

        // return 'Remove downvote. Upvote this post.'
        return upvotedPost
      }

      // already upvoted

      if (post.upvote.includes(loginUser._id)) {
        upvotedPost = await Post.findByIdAndUpdate(postId, {
          upvote: post.upvote.filter(downvoteUserId => downvoteUserId.toString() !== loginUser._id),
          vote: post.vote.filter(voteUserId => voteUserId.toString() !== loginUser._id)
        })

        // return 'already upvoted post, remove upvote'
        return upvotedPost
      }

      return 'upvote: this line should not occur'
    },

    downvote: async (_, { postId }, context) => {
      let downvotedPost
      const loginUser = checkAuth(context)

      const post = await Post.findById(postId)

      // First time vote
      if (!post.vote.includes(loginUser._id)) {
        downvotedPost = await Post.findByIdAndUpdate(postId, {
          downvote: post.downvote.concat(loginUser._id),
          vote: post.vote.concat(loginUser._id)
        })

        // return 'First time voted and downvoted.'
        return downvotedPost
      }

      // upvoted or already downvoted

      // remove upvoted 
      if (post.upvote.includes(loginUser._id)) {
        downvotedPost = await Post.findByIdAndUpdate(postId, {
          upvote: post.upvote.filter(upvotedUserId => upvotedUserId.toString() !== loginUser._id),
          downvote: post.downvote.concat(loginUser._id)
        })

        // return 'Remove upvote. Downvote this post.'
        return downvotedPost
      }

      // already downvoted

      if (post.downvote.includes(loginUser._id)) {
        downvotedPost = await Post.findByIdAndUpdate(postId, {
          downvote: post.downvote.filter(downvoteUserId => downvoteUserId.toString() !== loginUser._id),
          vote: post.vote.filter(voteUserId => voteUserId.toString() !== loginUser._id)
        })

        // return 'already downvoted post, remove downvote'
        return downvotedPost
      }

      return 'this line should not occur'
    },

  }
}