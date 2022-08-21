const { Schema, model } = require('mongoose')
const Subreddit = require('@models/subredditSchema')
const User = require('@models/userSchema')

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  body: {
    type: String,
    trim: true,
    minlength: 1
  },
  image: {
    // data: Buffer,
    data: String,
    contentType: String
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  upvote: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  downvote: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }
  ],
  createdAt: {
    type: Date,
    required: true,
    // default: new Date().toISOString()
    default: Date.now
  },

  subreddit: {
    type: Schema.Types.ObjectId,
    ref: 'Subreddit',
  }
})

postSchema.virtual('totalNumbersOfVotes').get(function (value, virtual, doc) {
  return this.upvote.length - this.downvote.length
})

postSchema.set('toObject', {
  getters: true
})

postSchema.post('save', async function (doc) {
  await Subreddit.findByIdAndUpdate(doc.subreddit._id, {
    $push: {
      post: doc._id
    }
  })

  await User.findByIdAndUpdate(doc.owner._id, {
    $push: {
      post: doc._id
    }
  })
})

module.exports = model('Post', postSchema)