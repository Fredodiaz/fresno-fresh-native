const express = require('express')
const router = express.Router()

// Middleware
const authenticateJWT = require('../middleware/jwt');

// Controllers
const { createUser, login, getData, logout } = require('../controllers/users')

// Endpoints
router.post('/register', createUser)
router.post('/login', login)
router.post('/token', authenticateJWT, token),
router.get('/data', authenticateJWT, getData)
router.post('/logout', authenticateJWT, logout)

module.exports = router