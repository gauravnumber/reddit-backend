const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
  body: {
    type: String,
    required: true,
    minlength: 1,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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

commentSchema.virtual('totalNumOfVotes').get(function (value, virtual, doc) {
  return this.upvote.length - this.downvote.length
})

commentSchema.set('toObject', {
  getters: true
})


module.exports = model('Comment', commentSchema)