const USER = require('./user')

module.exports = `#graphql
 type Mutation {
  ${USER}

   post(
     title: String!
     body: String!
     subredditName: String!
    #  subreddit: String!
   ): Post!

   upvote(
     postId: String!
   ): Post!

   downvote(
     postId: String!
   ): Post!

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

   deletePost(
     username: String!
     subredditName: String!
     postId: String!
   ): Post

  #  ): String!
 }
`;
