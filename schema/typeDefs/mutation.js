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

   setComment(
     postId: String!
     body: String!
   ): Comment!

   setSubreddit(
     name: String!
   ): Subreddit!

   deletePost(
     username: String!
     subredditName: String!
     postId: String!
   ): String!
 }
`;
