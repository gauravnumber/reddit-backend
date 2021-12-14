const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 5
  },
  body: {
    type: String,
    minlength: 5
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
  }
})

module.exports = model('Post', postSchema)