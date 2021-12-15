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
   ): Post!
  #  ): String!

   downvote(
     postId: String!
   ): Post!
  #  ): String!
 }
`;
