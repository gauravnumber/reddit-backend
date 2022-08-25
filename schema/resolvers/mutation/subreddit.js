const Subreddit = require('@models/subredditSchema')
const checkAuth = require('@context/check-auth')

module.exports = {
  Mutation: {
    setSubreddit: async (_, { name }, context) => {
      const loginUser = checkAuth(context)

      const subreddit = new Subreddit({
        name
      })

      return await subreddit.save()

      // return 'subreddit saved'
    }
  }
}