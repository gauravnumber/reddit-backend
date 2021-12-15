module.exports = `
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
   ): String!

   downvote(
     postId: String!
   ): String!
 }
`;
