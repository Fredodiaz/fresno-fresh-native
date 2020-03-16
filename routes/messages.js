const express = require('express')
const router = express.Router()

// Middleware
const authenticateJWT = require('../middleware/jwt');

// Controllers
const { createMessage, sendMessage, showConversation, viewConversations } = require('../controllers/messages')

// Endpoints
router.post('/create', authenticateJWT, createMessage)
router.post('/send', authenticateJWT, sendMessage)
router.post('/view', authenticateJWT, showConversation)
router.get('/all', authenticateJWT, viewConversations)

module.exports = router