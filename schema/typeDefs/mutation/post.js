module.exports = `#graphql
  post(
    title: String!
    body: String!
    subredditName: String!
<<<<<<< HEAD
=======
   #  subreddit: String!
>>>>>>> main
  ): Post!

  upvote(
    postId: String!
  ): Post!

  downvote(
    postId: String!
  ): Post!

  deletePost(
    username: String!
    subredditName: String!
    postId: String!
  ): Post

  editPost(
    postId: String!
  ): String!

`