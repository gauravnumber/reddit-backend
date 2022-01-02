const { AuthenticationError, UserInputError } = require('apollo-server')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { SECRET } = require('@config')
const User = require('@models/userSchema')

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
      }, SECRET)

      return { token, ...res._doc }
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

      console.log('SECRET', SECRET)

      const token = jwt.sign({
        _id: user._id,
        username: user.username,
      }, SECRET)


      return { token, ...user._doc }
    },

  }
}