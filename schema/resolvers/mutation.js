const { AuthenticationError, UserInputError } = require('apollo-server')

const checkAuth = require('../../context/check-auth')

const User = require('../../models/userSchema')
const Post = require('../../models/postSchema')

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

      console.log('newPostSave._doc', newPostSave._doc)

      return { ...newPostSave._doc }
      // return { id: newPostSave._id, ...newPostSave._doc }
    }
  }
}