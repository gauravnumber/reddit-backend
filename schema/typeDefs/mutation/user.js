module.exports = `#graphql
   register(
     username: String!
     password: String!
   ): User!

   login(
     username: String!
     password: String!
   ): User!
`