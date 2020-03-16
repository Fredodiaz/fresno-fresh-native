const express = require('express')
const router = express.Router()

// Middleware
const authenticateJWT = require('../middleware/jwt');

// Controllers
const { createUser, login, logout, loadUser } = require('../controllers/users')

// Endpoints
router.post('/register', createUser)
router.post('/login', login)
router.post('/token', authenticateJWT, token),
router.post('/logout', authenticateJWT, logout)
router.get('/load', authenticateJWT, loadUser)

module.exports = router