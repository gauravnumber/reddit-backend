require('dotenv').config()

const SECRET = process.env.SECRET
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  SECRET,
  MONGODB_URI,
}