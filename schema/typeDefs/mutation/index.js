const USER = require('./user')
const POST = require('./post')
const COMMENT = require('./comment')
const UPLOAD = require('./upload')

module.exports = `#graphql
 type Mutation {
  ${USER}
  ${POST}
  ${COMMENT}
  ${UPLOAD}

  setSubreddit(
    name: String!
  ): Subreddit!
 }
`;
