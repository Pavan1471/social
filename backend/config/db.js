const mongoose = require('mongoose')


const connectDB = async () => {
try {
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/socialmedia'
await mongoose.connect(mongoUri, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
console.log('MongoDB connected:', mongoUri)
} catch (err) {
console.error('MongoDB connection error:', err && err.message ? err.message : err)
if (err && err.message && err.message.toLowerCase().includes('uri malformed')) {
console.error(
'Malformed Mongo URI detected. If your password contains special characters (e.g. %, @, :, /) encode them with encodeURIComponent or use a local URI like mongodb://localhost:27017/socialmedia in your .env'
)
}
process.exit(1)
}
}


module.exports = connectDB