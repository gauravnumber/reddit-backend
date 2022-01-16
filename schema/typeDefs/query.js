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
    owner: User!
    upvote: [User]!
    downvote: [User]!
    totalNumOfVotes: Int!
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
    totalNumOfVotes: Int!
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

    getRecentPosts(
      sort: String
    ): [Post]!

    getSinglePost(
      postId: String!
    ): Post!
  }
`;
