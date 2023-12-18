const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


module.exports = async function (req, res, next) {
  const token = req?.header('Authorization')?.split(" ")[1];
  

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
   req.email=decoded.email
    // Check if the user still exists
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};
