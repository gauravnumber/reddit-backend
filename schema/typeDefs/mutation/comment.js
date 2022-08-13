module.exports = `#graphql
  upvoteComment(
    commentId: String!
  ): Comment!

  downvoteComment(
    commentId: String!
  ): Comment!

  setComment(
    postId: String!
    commentId: String
    body: String!
  ): Comment!

  deleteComment(
    commentId: String!
  ): Comment!
`