const express = require('express');
const { registerUser, getUserData, loginUser } = require('../controllers/userController');

const router = express.Router();

// Routes
// ⚠️ Order matters — define static routes FIRST
router.post('/register', registerUser);
router.post('/login', loginUser);

// THEN define dynamic routes
router.get('/:id', getUserData); // This should come last


module.exports = router;