const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String },
  email:String,
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
  professionalExperiences: [
    {
      companyName: String,
      techStack: String,
      skillsUsed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
      timePeriod: String,
    },
  ],
  educationalExperiences: [
    {
      degreeName: String,
      schoolName: String,
      timePeriod: String,
    },
  ],
 
});
const Developer=mongoose.model('Developer', developerSchema);
module.exports = Developer
