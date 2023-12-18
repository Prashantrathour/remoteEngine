import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import {ToastContainer} from "react-toastify"
import { errorAlert, succesAlert } from "../Components/Notification";
import { ImSpinner9 } from "react-icons/im";
const DeveloperOnboardingForm = () => {
  const navigate = useNavigate();
  const [loading,setloading]=useState(false)
  const [skillloading,skillsetloading]=useState(false)
  const authToken = localStorage.getItem("token");
  const authemail = localStorage.getItem("email");
  const [formData, setFormData] = useState({
    personalInformation: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    email: "",
    skills: [],
    professionalExperiences: [
      { companyName: "", techStack: "", skillsUsed: "", timePeriod: "" },
    ],
    educationalExperiences: [
      { degreeName: "", schoolName: "", timePeriod: "" },
    ],
  });

  const [predefinedSkills, setPredefinedSkills] = useState([]);
 

  useEffect(() => {
    // Fetch predefined skills from the backend

    if (!authToken || !authemail) {
      return navigate("/login");
    }
    setFormData({ ...formData, email: authemail });
    const fetchSkills = async () => {
      skillsetloading(true)
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/skills/get`
        );
        skillsetloading(true)
        setPredefinedSkills(response?.data?.skills);
      } catch (error) {
        skillsetloading(false);
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  const handleChange = (e, section, index, field) => {
    const { value } = e.target;

    if (field === "skillsUsed") {
     
      setFormData((prevData) => ({
        ...prevData,
        [section]: prevData[section].map((exp, i) =>
          i === index ? { ...exp, [field]: value } : exp
        ),
      }));
    } else {
    
      setFormData((prevData) => ({
        ...prevData,
        [section]:
          section === "personalInformation"
            ? {
                ...prevData[section],
                [field]: value,
              }
            : prevData[section].map((exp, i) =>
                i === index ? { ...exp, [field]: value } : exp
              ),
      }));
    }
  };

  const handleAddExperience = (section) => {
    if(section=="professionalExperiences"){

      setFormData((prevData) => ({
        ...prevData,
        [section]: [
          ...prevData[section],
          { companyName: "", techStack: "", skillsUsed: "", timePeriod: "" },
        ],
      }));
    }else{
      setFormData((prevData) => ({
        ...prevData,
        [section]: [
          ...prevData[section],
          { schoolName: "", degreeName: "", timePeriod: "" },
        ],
      }));

    }
  };

  const handleRemoveExperience = (section, index) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: prevData[section].filter((_, i) => i !== index),
    }));
  };

  const handleSkillChange = (selectedSkills, index, section) => {
    if (section === "personalInformation") {
      setFormData({ ...formData, skills: selectedSkills });
    }

    setFormData((prevData) => ({
      ...prevData,
      professionalExperiences: prevData.professionalExperiences.map((exp, i) =>
        i === index
          ? { ...exp, skillsUsed: selectedSkills.map((skill) => skill.value) }
          : exp
      ),
    }));
  };
// validate form fields
  const validateForm = () => {
    console.log(formData)
  
    for (const category in formData) {
      if (Object.hasOwnProperty.call(formData, category)) {
        const categoryData = formData[category];
  
     
        if (Array.isArray(categoryData)) {
       
          for (const item of categoryData) {
           
            for (const property in item) {
              if (Object.hasOwnProperty.call(item, property) && item[property] === "") {
               
                return false;
              }
            }
          }
        } else if (typeof categoryData === "object") {
       
          for (const property in categoryData) {
            if (Object.hasOwnProperty.call(categoryData, property) && categoryData[property] === "") {
              
              return false;
            }
          }
        } else if (categoryData === "") {
          
          return false;
        }
      }
    }
  
   
    return true;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (validateForm()) {
       console.log( {
        ...formData,
        firstName: formData.personalInformation.firstName,
        lastName: formData.personalInformation.lastName,
        email: formData.email,
        phoneNumber: formData.personalInformation.phoneNumber,
        skills: formData.skills,
        professionalExperiences: formData.professionalExperiences,
        educationalExperiences: formData.educationalExperiences,
      }) 
      try {
       setloading(true)
        let res=await axios.post(
          `${process.env.REACT_APP_API}/developers/onboarding`,
          {
            ...formData,
            firstName: formData.personalInformation.firstName,
            lastName: formData.personalInformation.lastName,
            email: formData.email,
            phoneNumber: formData.personalInformation.phoneNumber,
            skills: formData.skills,
            professionalExperiences: formData.professionalExperiences,
            educationalExperiences: formData.educationalExperiences,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
     succesAlert(res.data.message)
     setloading(false)
    } catch (error) {
      console.error("Error during developer onboarding:", error);
      errorAlert(error?.response?.data?.error||"something wrong")
      setloading(false)
      
      }
    } else {
      errorAlert("Please fill all details")
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-md shadow-xl border-orange-300 select-none">
        <ToastContainer/>
      <h2 className="text-2xl font-bold mb-4">Developer Onboarding</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-600"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="FirstName"
              value={formData.firstName}
              onChange={(e) =>
                handleChange(e, "personalInformation", 0, "firstName")
              }
              className="block w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-indigo-300"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-600"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="LastName"
              value={formData.lastName}
              onChange={(e) =>
                handleChange(e, "personalInformation", 0, "lastName")
              }
              className="block w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-indigo-300"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-600"
            >
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Phone Number"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) =>
                handleChange(e, "personalInformation", 0, "phoneNumber")
              }
              className="block w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-indigo-300"
            />
          </div>
          <div className="mb-4 cursor-not-allowed select-none">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <p>{formData.email}</p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Skills
          </label>
          <Select
            isMulti
            options={predefinedSkills?.map((skill) => ({
              value: skill._id,
              label: skill.predefinedSkills[0],
            }))}
            onChange={(selectedSkills) =>
              handleSkillChange(
                selectedSkills.map((skill) => skill.value),
                0,
                "personalInformation"
              )
            }
          />
        </div>
        {/* Professional Experiences */}
        <div className="mb-4 flex flex-col gap-5">
          <label className="block text-sm font-medium text-gray-600 p-4 bg-yellow-200">
            Professional Experiences
          </label>
          {formData.professionalExperiences.map((experience, index) => (
            <div key={index} className="space-y-2 mb-2 border border-lime-300  shadow-lg p-3 rounded-2xl transition-all">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="mb-4">
                  <label
                    htmlFor={`companyName${index}`}
                    className="block text-sm font-medium text-gray-600"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id={`companyName${index}`}
                    name={`companyName${index}`}
                    value={experience.companyName}
                    placeholder="Enter company name"
                    onChange={(e) =>
                      handleChange(
                        e,
                        "professionalExperiences",
                        index,
                        "companyName"
                      )
                    }
                    className="block w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-indigo-300"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor={`techStack${index}`}
                    className="block text-sm font-medium text-gray-600"
                  >
                    Tech Stack
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your tech stack (,)"
                    id={`techStack${index}`}
                    name={`techStack${index}`}
                    value={experience.techStack}
                    onChange={(e) =>
                      handleChange(
                        e,
                        "professionalExperiences",
                        index,
                        "techStack"
                      )
                    }
                    className="block w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-indigo-300"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor={`skillsUsed${index}`}
                    className="block text-sm font-medium text-gray-600"
                  >
                    Skills Used
                  </label>
                  <Select
                    isMulti
                    options={predefinedSkills?.map((skill) => ({
                      value: skill._id,
                      label: skill.predefinedSkills[0],
                    }))}
                    onChange={(selectedSkills) =>
                      handleSkillChange(selectedSkills, index)
                    }
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor={`timePeriod${index}`}
                  className="block text-sm font-medium text-gray-600"
                >
                  Time Period
                </label>
                <input
                placeholder="Enter your Time Period"
                  type="text"
                  id={`timePeriod${index}`}
                  name={`timePeriod${index}`}
                  value={experience.timePeriod}
                  onChange={(e) =>
                    handleChange(
                      e,
                      "professionalExperiences",
                      index,
                      "timePeriod"
                    )
                  }
                  className="block w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-indigo-300"
                />
              </div>

              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() =>
                    handleRemoveExperience("professionalExperiences", index)
                  }
                  className="text-sm text-red-600 hover:underline focus:outline-none"
                >
                  Remove Experience
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddExperience("professionalExperiences")}
            className="text-sm text-indigo-600 hover:underline focus:outline-none bg-green-300 py-4 rounded-lg"
          >
            Add Experience
          </button>
        </div>
        {/* Educational Experiences */}
        <div className="mb-4  flex gap-5 flex-col">
          <label className="block text-sm font-medium text-gray-600 p-4 bg-yellow-200">
            Educational Experiences
          </label>
          {formData.educationalExperiences.map((experience, index) => (
            <div key={index} className="space-y-2 mb-2 border border-lime-300  shadow-lg p-3 rounded-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="mb-4">
                  <label
                    htmlFor={`degreeName${index}`}
                    className="block text-sm font-medium text-gray-600"
                  >
                    Degree Name
                  </label>
                  <input
                    type="text"
                    id={`degreeName${index}`}
                    name={`degreeName${index}`}
                    value={experience.degreeName}
                    placeholder="Enter your degree"
                    onChange={(e) =>
                      handleChange(
                        e,
                        "educationalExperiences",
                        index,
                        "degreeName"
                      )
                    }
                    className="block w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-indigo-300"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor={`schoolName${index}`}
                    className="block text-sm font-medium text-gray-600"
                  >
                    School Name
                  </label>
                  <input
                    type="text"
                    id={`schoolName${index}`}
                    name={`schoolName${index}`}
                    value={experience.schoolName}
                    placeholder="Enter your school name"
                    onChange={(e) =>
                      handleChange(
                        e,
                        "educationalExperiences",
                        index,
                        "schoolName"
                      )
                    }
                    className="block w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-indigo-300"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor={`timePeriod${index}`}
                    className="block text-sm font-medium text-gray-600"
                  >
                    Time Period
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Time Period"
                    id={`timePeriod${index}`}
                    name={`timePeriod${index}`}
                    value={experience.timePeriod}
                    onChange={(e) =>
                      handleChange(
                        e,
                        "educationalExperiences",
                        index,
                        "timePeriod"
                      )

                    }
                    className="block w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-indigo-300"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() =>
                    handleRemoveExperience("educationalExperiences", index)
                  }
                  className="text-sm text-red-600 hover:underline focus:outline-none"
                >
                  Remove Education
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => handleAddExperience("educationalExperiences")}
            className="text-sm text-indigo-600 hover:underline focus:outline-none bg-green-300 py-4 rounded-lg"
          >
            Add Education
          </button>
        </div>
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2  w-36 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:border-indigo-300"
          >
           {loading? <span className="flex gap-2 justify-center items-center text-center"><ImSpinner9 className="animate-spin"/>Loading...</span>:"Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeveloperOnboardingForm;
