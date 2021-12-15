const Post = require('@models/postSchema')
const Comment = require('@models/commentSchema')

module.exports = {
  Mutation: {
    setComment: async (_, { postId, body }) => {
      const comment = new Comment({
        body
      })

      comment.save(async err => {
        if (err) return new Error(err)

        // need code refactoring
        const post = await Post.findById(postId)

        await Post.findByIdAndUpdate(postId, {
          comment: post.comment.concat(comment._id)
        })
      })

      return comment
      // return 'set comment'
    }
  }
}