// const express = require('express');
// const { registerUser, getUserData, loginUser } = require('../controllers/userController');
// const { protect } = require('../middleware/authMiddleware');

// const router = express.Router();

// router.post('/register', registerUser);
// router.post('/login', loginUser);

// // Secure route to get logged-in user info
// router.get('/profile', protect, async (req, res) => {
//   res.json(req.user);
// });

// // This should stay last
// router.get('/:id', getUserData);

// module.exports = router;


const express = require('express');
const { registerUser, getUserData, loginUser } = require('../controllers/userController');
const User = require('../models/userModel'); // ✅ Needed for /children route
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Register a new user
router.post('/register', registerUser);

// ✅ Login existing user
router.post('/login', loginUser);

// ✅ Secure route to get logged-in user's profile
router.get('/profile', protect, async (req, res) => {
  res.json(req.user);
});

// ✅ Fetch all children (for therapist dashboard)
router.get('/children', async (req, res) => {
  try {
    console.log("🔎 [GET /children] Fetching children from database...");
    const children = await User.find({ role: 'child' }).select('-password');
    console.log("✅ [GET /children] Found children:", children);
    res.json(children);
  } catch (err) {
    console.error("❌ [GET /children] Error fetching children:", err);
    res.status(500).json({ message: 'Server error fetching children', error: err.message });
  }
});

// ✅ This should stay LAST: get user by ID (dynamic route)
router.get('/:id', getUserData);

module.exports = router;
