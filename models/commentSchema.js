const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
  body: {
    type: String,
    required: true,
    minlength: 1
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
    ref: 'Comment',
  }],
  createdAt: {
    type: Date,
    required: true
  }
})

commentSchema.virtual('totalNumbersOfVotes').get(function (value, virtual, doc) {
  // console.log('this.upvote', this.upvote, '\n')
  // console.log('this.upvote', this.upvote, '\n')
  // console.log('this.downvote', this.downvote, '\n')
  // console.log(!this.upvote && !this.downvote)

  // if (!this.upvote && !this.downvote) return 0

  return this.upvote.length - this.downvote.length
})

commentSchema.set('toObject', {
  getters: true
})


module.exports = model('Comment', commentSchema)