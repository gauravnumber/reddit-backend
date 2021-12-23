const { Schema, model } = require('mongoose')
const validator = require('mongoose-unique-validator')

const userSchema = new Schema({
  username: {
    type: String,
    minlength: 6,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  post: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
})

userSchema.plugin(validator)

module.exports = model('User', userSchema)