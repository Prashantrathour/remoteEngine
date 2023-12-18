const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = {
  // Register user
  register: async (req, res) => {
    try {
      const { email, password, role } = req.body;

      // Validate input
      if (!email || !password || !role) {
        return res.status(404).json({ error: 'Please provide all required fields' });
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ email,role });
      if (existingUser) {
        return res.status(404).json({ error: role+" "+'User already exists',role });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 5);
      // Create user
      const user = new User({ email, password: hashedPassword, role });
     const response= await user.save();
      console.log(response)

      res.status(201).json({ message: role+" "+'registered successfully',role });
    } catch (error) {
     
      res.status(404).json({ message:error});
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const { email, password,role } = req.body;

      // Find user
      const user = await User.findOne({ email,role });
      console.log(user,"find")
      if (!user) {
        return res.status(404).json({ error: 'Invalid credentials' });
      }
        try {
          
          const token = jwt.sign({ userId: user._id,email }, process.env.JWT_SECRET);
    
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return res.status(404).json({ error :"Wrong Password"});
          }
          res.json({ token ,message:`${role} login successful`,role,email});
        } catch (error) {
          return res.status(404).json({ error: error });
        }
        // Compare passwords

      // Generate JWT token
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(404).json({ error: 'Internal Server Error' });
    }
  },
};
