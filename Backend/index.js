const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/Auth.routes');
const developerRoutes = require('./routes/developers.routes');
const skillRoutes = require('./routes/skill.routes');
const connection = require('./config/db');
const cors=require("cors")
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors())


// Routes
app.use('/user', authRoutes);
app.use('/developers', developerRoutes);
app.use('/skills', skillRoutes);
app.get("/",(req,res)=>{
    return res.send("Welcome Api working")
})
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, async(req,res) => {
    try {
        console.log('Starting to connect please wait...');
        await connection
        console.log("Connection establised server running...")
    } catch (error) {
        
        console.log({message:"Internal Server error"})
    }
  console.log(`Server is running on port ${PORT}`);
});
