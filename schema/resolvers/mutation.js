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
      const loginUser = checkAuth(context)

      // const user = await User.findById(loginUser.id)

      const post = await Post.findById(postId)

      // First time vote
      if (!post.vote.includes(loginUser._id)) {
        await Post.findByIdAndUpdate(postId, {
          upvote: post.upvote.concat(loginUser._id),
          vote: post.vote.concat(loginUser._id)
        })

        return 'First time voted and upvoted.'
      }

      // already downvoted or already upvoted

      // remove downvote 
      if (post.downvote.includes(loginUser._id)) {
        await Post.findByIdAndUpdate(postId, {
          downvote: post.upvote.filter(upvotedUserId => upvotedUserId.toString() !== loginUser._id),
          upvote: post.upvote.concat(loginUser._id)
        })

        return 'Remove downvote. Upvote this post.'
      }

      // already upvoted

      if (post.upvote.includes(loginUser._id)) {
        await Post.findByIdAndUpdate(postId, {
          upvote: post.upvote.filter(downvoteUserId => downvoteUserId.toString() !== loginUser._id),
          vote: post.vote.filter(voteUserId => voteUserId.toString() !== loginUser._id)
        })

        return 'already upvoted post, remove upvote'
      }

      return 'this line should not occur'
    },

    // upvote: async (_, { postId }, context) => {
    //   const loginUser = checkAuth(context)

    //   // const user = await User.findById(loginUser.id)

    //   const post = await Post.findById(postId)

    //   // first time upvoted
    //   if (!post.upvote.includes(loginUser._id)) {
    //     const newPost = await Post.findByIdAndUpdate(postId, {
    //       upvote: post.upvote.concat(loginUser._id),
    //       vote: post.vote.concat(loginUser._id)
    //     })

    //     console.log('newPost._doc', newPost._doc)
    //     return "upvoted"
    //   }

    //   // undo upvote

    //   await Post.findByIdAndUpdate(postId, {
    //     upvote: post.upvote.filter(upvoteId => upvoteId.toString() !== loginUser._id),
    //     vote: post.vote.filter(voteId => voteId.toString() !== loginUser._id),
    //   })

    //   return "dis-upvoted"
    // },

    downvote: async (_, { postId }, context) => {
      const loginUser = checkAuth(context)

      // const user = await User.findById(loginUser.id)

      const post = await Post.findById(postId)

      // First time vote
      if (!post.vote.includes(loginUser._id)) {
        await Post.findByIdAndUpdate(postId, {
          downvote: post.downvote.concat(loginUser._id),
          vote: post.vote.concat(loginUser._id)
        })

        return 'First time voted and downvoted.'
      }

      // upvoted or already downvoted

      // remove upvoted 
      if (post.upvote.includes(loginUser._id)) {
        await Post.findByIdAndUpdate(postId, {
          upvote: post.upvote.filter(upvotedUserId => upvotedUserId.toString() !== loginUser._id),
          downvote: post.downvote.concat(loginUser._id)
        })

        return 'Remove upvote. Downvote this post.'
      }

      // already downvoted

      if (post.downvote.includes(loginUser._id)) {
        await Post.findByIdAndUpdate(postId, {
          downvote: post.downvote.filter(downvoteUserId => downvoteUserId.toString() !== loginUser._id),
          vote: post.vote.filter(voteUserId => voteUserId.toString() !== loginUser._id)
        })

        return 'already downvoted post, remove downvote'
      }

      return 'this line should not occur'
    },

  }
}