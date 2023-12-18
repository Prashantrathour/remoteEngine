// ClientPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import AddSkillsPage from '../Components/AddSkillsPage';
import DevelopersList from '../Components/DeveloperList';

const navbarStyle = 'bg-blue-500 p-4 text-white';
const containerStyle = 'max-w-4xl mx-auto mt-8 p-6';

const ClientPage = () => {
  return (
    <div>
     

      <div className={containerStyle}>
        <AddSkillsPage />
        <DevelopersList />
      </div>
    </div>
  );
};

export default ClientPage;
