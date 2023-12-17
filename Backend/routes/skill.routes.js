const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

// Fetch all skills route
router.get('/get', skillController.getAllSkills);
router.post("/post",skillController.addSkill)

module.exports = router;
