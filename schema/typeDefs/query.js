module.exports = `#graphql
  type User {
    _id: ID!
    username: String!
    token: String!
    post: [Post]!
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
    vote: [User]!
    upvote: [User]!
    downvote: [User]!
    totalNumOfVote: Int!
    comment: [Comment]!
    createdAt: String!
    subreddit: Subreddit!
  }
  
  type Subreddit {
    _id: ID!
    name: String!
    post: [Post]!
  }

  type Query {
    show: String!
    getSubredditPost(
      name: String!
      sort: String
    ): [Post]!

    getPostsByUser(
      username: String!
      sort: String
    ): [Post]!

    getRecentPosts: [Post]!
  }
`;
