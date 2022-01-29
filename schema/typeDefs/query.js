module.exports = `#graphql
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
