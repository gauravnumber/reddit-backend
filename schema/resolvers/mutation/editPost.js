module.exports = {
  Mutation: {
    editPost: (_, { postId }) => {
      return `post id is ${postId}`
    }
  }
}
