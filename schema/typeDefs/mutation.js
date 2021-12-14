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
  #  ): String!
   ): Post!
 }
`;
