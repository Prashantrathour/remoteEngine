import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const containerStyle = 'w-1/2 mx-auto text-center';
const inputStyle = 'w-full p-2 mb-4 border rounded';
const buttonStyle = 'p-2 bg-blue-500 text-white rounded cursor-pointer';

const predefinedOptions = [
  'JavaScript',
  'React',
  'Node.js',
  'Python',
  'Java',
  'HTML',
  'CSS',
];

function AddSkillsPage() {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);


  const handleAddSkill = async () => {
    try {
    
     let res= await axios.post(`${process.env.REACT_APP_API}/skills/post`, { skill: selectedSkill.label });
     console.log(res)
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };
useEffect(()=>{
    const fetchSkills = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API}/skills/get`
          );
          console.log(response)
          setSkills(response?.data?.skills);
        } catch (error) {
          console.error("Error fetching skills:", error);
        }
      };
  
      fetchSkills();
},[])
  return (
    <div className={containerStyle}>
      <h2>Add Skills</h2>
      <Select
        options={predefinedOptions.map(skill => ({ label: skill, value: skill }))}
        value={selectedSkill}
        onChange={selectedOption => setSelectedSkill(selectedOption)}
        placeholder="Select a skill"
      />
      <button
        onClick={handleAddSkill}
        disabled={!selectedSkill}
        className={buttonStyle}
      >
        Add Skill
      </button>
<p>Already Added skills</p>
      <ul>
        {skills.map(skill => (
          <li key={skill._id}>{skill.predefinedSkills[0]}</li>
        ))}
      </ul>
    </div>
  );
}

export default AddSkillsPage;
