const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
  body: {
    type: String,
    required: true,
    minlength: 1,
  },
  upvote: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  downvote: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  comment: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
})

module.exports = model('Comment', commentSchema)