require('dotenv').config()

const SECRET = process.env.SECRET
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 4000

module.exports = {
  SECRET,
  MONGODB_URI,
  PORT,
}