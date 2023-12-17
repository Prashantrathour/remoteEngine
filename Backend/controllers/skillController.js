const Skill = require('../models/skill.model');

module.exports = {
  // Get all skills
  getAllSkills: async (req, res) => {
    try {
      const skills = await Skill.find().select('predefinedSkills');
      const predefinedSkills = skills.length > 0 ? skills : [];
      res.json({skills:predefinedSkills});
    } catch (error) {
      console.error('Error fetching skills:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Add a new skill
  addSkill: async (req, res) => {
    try {
      const { skill } = req.body;

      if (!skill) {
        return res.status(400).json({ error: 'Please provide the skill name' });
      }

      
      const existingSkill = await Skill.findOne({ predefinedSkills: skill});
      if (existingSkill) {
        return res.status(400).json({ error: 'Skill already exists' });
      }

      
      const newSkill = new Skill({ predefinedSkills: skill});
      await newSkill.save();

      res.status(201).json({ message: 'Skill added successfully' });
    } catch (error) {
      console.error('Error adding skill:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  
};
