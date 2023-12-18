const Developer = require("../models/developers.model");
const EducationExperience = require("../models/educationExperience.model");
const ProfessionalExperience = require("../models/professionalExperience.model");

module.exports = {
  // Fetch developer profile
  getDeveloperProfile: async (req, res) => {
    try {
      const developer = await Developer.find()
        .populate("skills")
        .populate("professionalExperiences.skillsUsed");

      if (!developer) {
        return res.status(404).json({ error: "Developer not found" });
      }

      res.json(developer);
    } catch (error) {
      console.error("Error fetching developer profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
