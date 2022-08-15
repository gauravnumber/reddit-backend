const { AuthenticationError } = require('apollo-server-express')
const jwt = require('jsonwebtoken')
const { SECRET } = require("@config")

module.exports = (context) => {
  const auth = context.req.headers.authorization

  if (auth && auth.startsWith('Bearer ')) {
    const token = auth.substring(7)
    const decodedToken = jwt.verify(token, SECRET)

    return decodedToken
  }

  throw new AuthenticationError('First you need to login.')
}