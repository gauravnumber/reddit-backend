module.exports = `#graphql
  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type User {
    _id: ID!
    username: String!
    token: String!
    post: [Post]!
  }

  type Comment {
    _id: ID!
    body: String!
    image: Upload
    owner: User!
    upvote: [User]!
    downvote: [User]!
    totalNumbersOfVotes: Int
    comment: [Comment]
    createdAt: String
    parentPost: Post!
    parentComment: Comment
  }

  type Post {
    _id: ID!
    title: String!
    body: String
    image: Upload
    owner: User!
    upvote: [User]!
    downvote: [User]!
    totalNumbersOfVotes: Int
    comment: [Comment]
    createdAt: String!
    subreddit: Subreddit!
  }
  
  type Subreddit {
    _id: ID!
    name: String!
    post: [Post]!
  }
`