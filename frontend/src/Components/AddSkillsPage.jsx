import {ToastContainer} from "react-toastify"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { ImSpinner9 } from 'react-icons/im';
import { errorAlert, succesAlert } from './Notification';


const inputStyle = 'w-full p-2 mb-4  rounded';
const buttonStyle = 'p-2 bg-blue-500 text-white rounded cursor-pointer';
const spinnerStyle = 'text-blue-500 animate-spin';
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
  const [loading, setLoading] = useState(false);

  const handleAddSkill = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.REACT_APP_API}/skills/post`, {
        skill: selectedSkill.label,
      });
     succesAlert(res?.data?.message)
      setLoading(false);
      
    } catch (error) {
      console.error('Error adding skill:', error);
      setLoading(false);
      errorAlert(error.response.data.error)
    }
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `${process.env.REACT_APP_API}/skills/get`
        );
        setLoading(false)
        setSkills(response?.data?.skills);
      } catch (error) {
        console.error('Error fetching skills:', error);
        errorAlert(error?.message||"Something went wrong");
        setLoading(false)
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className='w-1/2 mx-auto  flex flex-col gap-3 justify-left  text-left'>
      <ToastContainer/>
    
      <Select
        options={predefinedOptions.map((skill) => ({
          label: skill,
          value: skill,
        }))}
        value={selectedSkill}
        onChange={(selectedOption) => setSelectedSkill(selectedOption)}
        placeholder="Select a skill"
        className={inputStyle}
      />
      <button
        onClick={handleAddSkill}
        disabled={!selectedSkill}
        className={buttonStyle}
      >
        {loading ? (
      <span className="flex gap-2 items-center text-center justify-center">{"Loading..."} <ImSpinner9 className="animate-spin" /></span>
        ) : (
          'Add Skill'
        )}
      </button>
      <div className=" flex flex-col flex-wrap items-center gap-3">
        <p>Already Added skills</p>
        <ul className="flex gap-2">
          {skills.map((skill) => ( 
            <li
              key={skill._id}
              className="bg-green-300 text-green-800 p-2 rounded"
            >
              {skill.predefinedSkills[0]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddSkillsPage;
