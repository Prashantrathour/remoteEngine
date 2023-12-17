const Developer = require("../models/developers.model");
const EducationExperience = require("../models/educationExperience.model");
const ProfessionalExperience = require("../models/professionalExperience.model");

module.exports = {
  // Developer onboarding
  onboarding: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        phoneNumber,
        skills,
        professionalExperiences,
        educationalExperiences,
      } = req.body;
      const existingDeveloper = await Developer.findOne({ user: req.userId });

      if (existingDeveloper) {
        return res
          .status(400)
          .json({ error: "Developer profile already exists" });
      }

      // Create developer
      const developer = new Developer({
        user: req.userId, // userId from authentication middleware
        firstName,
        lastName,
        phoneNumber,
        skills,
        professionalExperiences,
        educationalExperiences,
      });

      const savedDeveloper = await developer.save();

      // Save professional experiences
      if (professionalExperiences) {
        for (let x of professionalExperiences) {
          try {
            const professionalExperience = new ProfessionalExperience({
              ...x,
              developer: savedDeveloper._id,
            });
            await professionalExperience.save();
          } catch (error) {
            console.error("Error saving professional experience:", error);
            return res.status(500).json({ error: "Internal Server Error" });
          }
        }
      }

      // Save educational experiences
      if (educationalExperiences) {
        for (let x of educationalExperiences) {
          try {
            const eduExperience = new EducationExperience({
              ...x,
              developer: savedDeveloper._id,
            });
            await eduExperience.save();
          } catch (error) {
            console.error("Error saving educational experience:", error);
            return res.status(500).json({ error: "Internal Server Error" });
          }
        }
      }

      res
        .status(201)
        .json({ message: "Developer onboarding completed successfully" });
    } catch (error) {
      console.error("Error onboarding developer:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Fetch developer profile
  getProfile: async (req, res) => {
    try {
      const developer = await Developer.findOne({ user: req.userId })
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
