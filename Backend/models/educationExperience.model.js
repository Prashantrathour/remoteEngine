const mongoose = require('mongoose');

const educationExperienceSchema = new mongoose.Schema({
  developer: { type: mongoose.Schema.Types.ObjectId, ref: 'Developer', required: true },
  degreeName: { type: String, required: true },
  schoolName: { type: String, required: true },
  timePeriod: { type: String, required: true },
  
});
const educationExperienceModel=mongoose.model('EducationExperience', educationExperienceSchema);
module.exports = educationExperienceModel
