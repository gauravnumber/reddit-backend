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
    body: String
    image: Upload
  ): Comment

  deleteComment(
    commentId: String!
  ): Comment!
`