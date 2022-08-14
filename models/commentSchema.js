const Post = require('@models/postSchema')
const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
  body: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  parentPost: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  parentComment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
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
  return this.upvote.length - this.downvote.length
})

commentSchema.set('toObject', {
  getters: true
})

// commentSchema.pre('save', function (doc) {
//   console.log('doc', doc, '\n')
//   // console.log('this.getQuery()', this.getQuery())
//   // console.log(this)
// })

// const CommentModel = model('Comment', commentSchema)

commentSchema.post('save', async function (doc) {
  //? Add comment in post
  if (!doc.parentComment) {
    await Post.findByIdAndUpdate(doc.parentPost, {
      $push: {
        comment: doc._id
      }
    })
  }

  //? Add comment in comment
  if (doc.parentComment) {
    await model('Comment', commentSchema).findByIdAndUpdate(doc.parentComment, {
      $push: {
        comment: doc._id
      }
    })
  }
})

module.exports = model('Comment', commentSchema)
