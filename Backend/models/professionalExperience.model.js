const mongoose = require('mongoose');

const professionalExperienceSchema = new mongoose.Schema({
  developer: { type: mongoose.Schema.Types.ObjectId, ref: 'Developer', required: true },
  companyName: { type: String, required: true },
  techStack: { type: String },
  skillsUsed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
  timePeriod: { type: String, required: true },

});
const professionalExperiencesModel=mongoose.model('ProfessionalExperience', professionalExperienceSchema);
module.exports = professionalExperiencesModel;
