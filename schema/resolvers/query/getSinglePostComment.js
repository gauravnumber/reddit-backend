const { sortByDesc } = require('@utils')

const Post = require('@models/postSchema')

module.exports = {
  Query: {
    getSinglePostComment: async (_, { postId, offset = 0, limit = 10 }) => {
      let post = await Post.findById(postId)
        .populate({
          path: 'comment',
          options: {
            // sort: { body: -1 },
            // skip: offset,
            // limit
          },
          // perDocumentLimit: limit
          // match: {
          //   totalNumOfVotes: {
          //     $gt: 0
          //   }
          // }
        })

      // console.log('post.comment', post.comment)
      return post.comment.sort(sortByDesc("totalNumbersOfVotes")).splice(offset, offset + limit)
    }
  }
}