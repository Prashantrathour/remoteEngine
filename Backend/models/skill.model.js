const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  predefinedSkills: {
    type: [
      {
        type: String,
        enum: [
          'JavaScript',
          'React',
          'Node.js',
          'Python',
          'Java',
          'HTML',
          'CSS',
        
        ],
        set: capitalizeFirstLetter,
      },
    ],
    default: undefined,
  },
});

function capitalizeFirstLetter(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;
