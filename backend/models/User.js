const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    storeName: { type: String, default: '' },
    role: { type: String, enum: ['store', 'customer'], required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
