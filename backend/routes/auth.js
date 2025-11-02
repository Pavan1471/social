const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret'

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, storeName, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' })
    }

    // check if user exists
    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ error: 'User already exists' })

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)

    user = new User({ name, email, storeName, password: hashed })
    await user.save()

    // create JWT token
    const payload = { userId: user.id }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })

    res.status(201).json({
      message: 'User created',
      token,
      user: { id: user.id, name: user.name, email: user.email, storeName: user.storeName },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' })

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })

    const matched = await bcrypt.compare(password, user.password)
    if (!matched) return res.status(401).json({ error: 'Invalid credentials' })

    const payload = { userId: user.id }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })

    res.json({
      message: 'Authenticated',
      token,
      user: { id: user.id, name: user.name, email: user.email, storeName: user.storeName },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// GET /api/auth/me - returns current user (requires Authorization: Bearer <token>)
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' })
    }
    const token = authHeader.split(' ')[1]
    let decoded
    try {
      decoded = jwt.verify(token, JWT_SECRET)
    } catch (e) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    const user = await User.findById(decoded.userId).select('-password')
    if (!user) return res.status(404).json({ error: 'User not found' })

    res.json({ user })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router