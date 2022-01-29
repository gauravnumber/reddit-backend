const USER = require('./user')
const POST = require('./post')
const COMMENT = require('./comment')

module.exports = `#graphql
 type Mutation {
  ${USER}
  ${POST}
  ${COMMENT}

  setSubreddit(
    name: String!
  ): Subreddit!
 }
`;
