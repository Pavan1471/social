const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret'

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, storeName, password, role } = req.body


    // Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Name, email, password and role are required' })
    }

    // If role is store, storeName must be provided
    if (role === 'store' && !storeName) {
      return res.status(400).json({ error: 'Store name is required for store role' })
    }

    // Check if user already exists
    let existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      storeName: role === 'store' ? storeName : '',
      role,
    })

    await user.save()

    // Create JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        storeName: user.storeName,
        role: user.role,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        storeName: user.storeName,
        role: user.role,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
})

// GET /api/auth/me - Get current user info
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
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    const user = await User.findById(decoded.userId).select('-password')
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router
