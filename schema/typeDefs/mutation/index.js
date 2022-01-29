const USER = require('./user')
const POST = require('./post')

module.exports = `#graphql
 type Mutation {
  ${USER}
  ${POST}

   upvoteComment(
     commentId: String!
   ): Comment!

   downvoteComment(
     commentId: String!
   ): Comment!

   setComment(
    #  id: String!
     postId: String
     commentId: String
     body: String!
   ): Comment!

   setSubreddit(
     name: String!
   ): Subreddit!

  #  deletePost(
  #    username: String!
  #    subredditName: String!
  #    postId: String!
  #  ): Post

  #  ): String!
 }
`;
