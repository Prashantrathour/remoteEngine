import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeveloperProfile from './DeveloperProfile'; // Import the DeveloperProfile component

const DevelopersList = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/client/developerprofile`);
        setDevelopers(response?.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching developers:', error);
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Developers</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div>
          {developers.map((developer) => (
            <DeveloperProfile key={developer._id} profile={developer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DevelopersList;
