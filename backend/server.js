require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const app = express()
const PORT = process.env.PORT || 5000

// ✅ Connect to MongoDB
connectDB()

// ✅ Middleware
app.use(cors())
app.use(express.json())

// ✅ Routes
app.use('/api/auth', require('./routes/auth'))
// app.use('/api/analytics', require('./routes/analytics'))
app.use('/api/reviews', require('./routes/reviewRoutes')) // 
app.use('/api/ai', require('./routes/aiAnalysis'))
app.use('/api/keywords', require('./routes/keywords'))


// ✅ Health check route
app.get('/', (req, res) => res.send('Auth, Analytics & Feedback server running'))

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
