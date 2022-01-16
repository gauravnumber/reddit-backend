const checkAuth = require('@context/check-auth')

const Post = require('@models/postSchema')
const Comment = require('@models/commentSchema')

module.exports = {
  Mutation: {
    // setComment: async (_, { postId, commentId, body }, context) => {
    setComment: async (_, { id, body }, context) => {
      const { postId, commentId } = id

      const user = checkAuth(context)
      // console.log(`user`, user)

      const comment = new Comment({
        body,
        owner: user._id
      })

      comment.save(async (err, doc) => {
        if (err) return new Error(err)

        // console.log(`doc`, doc)
        // need code refactoring
        // const post = await Post.findById(postId)
        if (commentId) {
          await Comment.findByIdAndUpdate(commentId, {
            $push: {
              comment: doc._id
            }
          })
        } else if (postId) {
          await Post.findByIdAndUpdate(postId, {
            $push: {
              comment: doc._id
            }
          })
        }
        // await Post.findByIdAndUpdate(postId, {
        //   comment: post.comment.concat(doc._id)
        //   // comment: post.comment.concat(comment._id)
        // })
      })

      return comment
      // return 'set comment'
    }
  }
}