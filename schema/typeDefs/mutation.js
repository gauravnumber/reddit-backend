module.exports = `#graphql
 type Mutation {
   register(
     username: String!
     password: String!
   ): User!

   login(
     username: String!
     password: String!
   ): User!

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
   ): String!

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
