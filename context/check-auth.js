const { AuthenticationError } = require('apollo-server')

const jwt = require('jsonwebtoken')

module.exports = (context) => {
  const auth = context.req.headers.authorization

  if (auth && auth.startsWith('Bearer ')) {
    const token = auth.substring(7)

    const decodedToken = jwt.verify(token, 'SECRET')

    return decodedToken
  }

  throw new AuthenticationError('First you need to login.')

}