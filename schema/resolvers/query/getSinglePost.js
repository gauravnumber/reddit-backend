// const { sortByDesc } = require('@utils')

const Post = require('@models/postSchema')

module.exports = {
  Query: {
    getSinglePost: async (_, { postId }) => {
      let post = await Post.findById(postId).populate('comment')
      // .populate({
      //   path: 'comment',
      //   match: {
      //     totalNumOfVotes: {
      //       $gt: 0
      //     }
      //   }
      // })

      // post = post.comment.sort(sortByDesc('totalNumOfVotes'))
      // console.log('post', post)
      return post

      // return 'getSinglePost'
    }
  }
}