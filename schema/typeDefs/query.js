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

    getPosts(
      subredditName: String
      username: String
      sort: String
      offset: Int,
      limit: Int,
      type: String!
    # ): String!
    ): [Post]!

    # sortComments(
    #   commentId:
    # )
  }
`;
