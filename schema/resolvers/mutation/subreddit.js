const Subreddit = require('@models/subredditSchema')

module.exports = {
  Mutation: {
    setSubreddit: async (_, { name }) => {
      const subreddit = new Subreddit({
        name
      })

      return await subreddit.save()

      // return 'subreddit saved'
    }
  }
}