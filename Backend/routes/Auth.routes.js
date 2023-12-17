const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();


// Register user route
router.post('/register', authController.register);

// Login user route
router.post('/login', authController.login);

module.exports = router;
