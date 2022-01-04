require('dotenv').config()

const SECRET = process.env.SECRET
const MONGODB_URI = process.env.MONGODB_URI
const PORT = 4000 || process.env.PORT

module.exports = {
  SECRET,
  MONGODB_URI,
  PORT,
}