// const { sortByDesc } = require('@utils')

const Post = require('@models/postSchema')

module.exports = {
  Query: {
    getSinglePostComment: async (_, { postId, offset = 0, limit = 10 }) => {
      let post = await Post.findById(postId)
        // .populate('comment')
        .populate({
          path: 'comment',
          options: {
            skip: offset,
            limit
          },
          // perDocumentLimit: limit
          // match: {
          //   totalNumOfVotes: {
          //     $gt: 0
          //   }
          // }
        })

      console.log('post.comment', post.comment)
      return post.comment
    }
  }
}