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
   ): String!
 }
`;
