module.exports = `
  type User {
    _id: ID!
    username: String!
    token: String!
  }

  type Comment {
    _id: ID!
    body: String!
    upvote: [User]!
    downvote: [User]!
    totalNumOfVote: Int!
    comment: [Comment]!
  }

  type Post {
    _id: ID!
    title: String!
    body: String!
    owner: User!
    upvote: [User]!
    downvote: [User]!
    totalNumOfVote: Int!
    comment: [Comment]!
  }

  type Query {
    show: String!
  }

`;