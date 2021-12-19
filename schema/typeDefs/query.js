module.exports = `#graphql
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
      subredditId: String!
      sort: String
    ): [Post]!
    # ): String!
  }
`;
