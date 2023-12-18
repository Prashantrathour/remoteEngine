import React from 'react';

const containerStyle =
  'max-w-xl mx-auto mt-8 p-4 border rounded bg-white shadow-md text-left';
const headerStyle = 'text-2xl font-bold mb-4';
const listItemStyle = 'mb-2';

const DeveloperProfile = ({ profile }) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    skills,
    professionalExperiences,
    educationalExperiences,
  } = profile;

  return (
    <div className={containerStyle}>
      <h2 className={headerStyle}>Developer Profile</h2>

      <div>
        <strong>Personal Information:</strong>
        <p>{`Name: ${firstName} ${lastName}`}</p>
        <p>{`Phone Number: ${phoneNumber}`}</p>
      </div>

      <div className={listItemStyle}>
        <strong>Email:</strong>
        <p>{email}</p>
      </div>

      <div className={listItemStyle}>
        <strong>Skills:</strong>
        <ul>
          {skills.map((skill) => (
            <li
              key={skill._id}
              className="border-b border-gray-300 py-2 last:border-b-0"
            >
              {skill.predefinedSkills[0]}
            </li>
          ))}
        </ul>
      </div>

      <div className={listItemStyle}>
        <strong>Professional Experiences:</strong>
        <ul>
          {professionalExperiences.map((experience) => (
            <li
              key={experience._id}
              className="border-b border-gray-300 py-2 last:border-b-0"
            >
              {`Company: ${experience.companyName}, Tech Stack: ${experience.techStack}, Time Period: ${experience.timePeriod}`}
            </li>
          ))}
        </ul>
      </div>

      <div className={listItemStyle}>
        <strong>Educational Experiences:</strong>
        <ul>
          {educationalExperiences.map((experience) => (
            <li
              key={experience._id}
              className="border-b border-gray-300 py-2 last:border-b-0"
            >
              {`Degree: ${experience.degreeName}, School: ${experience.schoolName}, Time Period: ${experience.timePeriod}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeveloperProfile;
