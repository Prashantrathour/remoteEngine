const express = require('express');
const developerController = require('../controllers/developerController');
const AuthMiddleware = require('../middleware/Auth.middleware');
const router = express.Router();


// Developer onboarding route
router.post('/onboarding', AuthMiddleware, developerController.onboarding);

// Fetch developer profile route
router.get('/profile', AuthMiddleware, developerController.getProfile);

module.exports = router;
