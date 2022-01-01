const Subreddit = require('@models/subredditSchema')
const { sortByDesc } = require('@utils')

module.exports = {
  Query: {
    // getSubredditPost: async (_, { subredditId, sort = 'hot' }) => {
    getSubredditPost: async (_, { name, sort = 'hot' }) => {
      // const subreddit = await Subreddit.findById(subredditId).populate('post')
      const subreddit = await Subreddit.findOne({ name }).populate('post')

      if (sort === 'hot') {
        return subreddit.post.sort(sortByDesc('createdAt'))
      } else if (sort === 'top:alltime') {
        let filterPost = subreddit.post.filter(p => p.upvote.length > 0)

        filterPost = subreddit.post

        console.log('subreddit.post', subreddit.post)

        // console.log('typeof filterPost[0].upvote.length', typeof filterPost[0].upvote.length)
        // const sortBy = (key) => {
        //     return (a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
        // };
        // [...array].sort(sortBy(key));

        // sortByDesc(filterPost)


        let filterPostSort = filterPost.sort((a, b) => (a["upvote"].length > b["upvote"].length) ? 1 : ((b["upvote"].length > a["upvote"].length) ? -1 : 0))
        // let filterPostSort = filterPost.sort(sortByDesc("upvote"))

        // let filterPostSort = filterPost.sort((a, b) => 
        // (a['upvote'].length > b['upvote'].length) ? -1 : 1)

        return filterPostSort
      } else if (sort === 'top:week') {
        let filterPost = subreddit.post

        filterPost = filterPost.filter(post => post.createdAt > Date.now() - 1000 * 3600 * 24 * 7)
          .filter(p => p.upvote.length > 0).sort((a, b) => b.upvote.length - a.upvote.length)

        return filterPost
      } else if (sort === 'top:day') {
        let filterPost = subreddit.post

        filterPost = filterPost.filter(post => post.createdAt > Date.now() - 1000 * 3600 * 24)
          .filter(p => p.upvote.length > 0).sort((a, b) => b.upvote.length - a.upvote.length)

        return filterPost
      } else if (sort === 'top:month') {
        let filterPost = subreddit.post

        filterPost = filterPost.filter(post => post.createdAt > Date.now() - 1000 * 3600 * 24 * 7 * 30)
          .filter(p => p.upvote.length > 0).sort((a, b) => b.upvote.length - a.upvote.length)

        return filterPost
      }
    }

  }
}