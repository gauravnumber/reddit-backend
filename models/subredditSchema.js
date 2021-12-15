const { Schema, model } = require('mongoose')
const validator = require('mongoose-unique-validator')

const subredditSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
  },
  post: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
})

subredditSchema.plugin(validator)

module.exports = model('Subreddit', subredditSchema)
