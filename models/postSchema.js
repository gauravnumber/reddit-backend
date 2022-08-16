const { Schema, model } = require('mongoose')

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
    data: Buffer,
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
    default: new Date().toISOString()
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

// postSchema.set('toJSON', {
//   getters: true
// })

module.exports = model('Post', postSchema)