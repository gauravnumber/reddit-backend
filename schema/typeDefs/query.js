module.exports = `#graphql
  type Query {
    show: String!
    getSubredditPost(
      name: String!
      sort: String
      offset: Int
      limit: Int
    ): [Post]!

    getPostsByUser(
      username: String!
      sort: String
      offset: Int
      limit: Int
    ): [Post]!

    getRecentPosts(
      sort: String
      offset: Int
      limit: Int
    ): [Post]!

    getSinglePost(
      postId: String!
      offset: Int
      limit: Int
    ): Post!

    getSinglePostComment(
      postId: String!
      offset: Int
      limit: Int
    ): [Comment]!


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
