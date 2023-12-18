import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';

import {ToastContainer} from "react-toastify"

import { errorAlert, succesAlert } from '../Components/Notification';
import axios from "axios"
const Login = () => {
  const navigate=useNavigate()
 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [role, setRole] = useState('developer');

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      password: '',
    };

    if (!formData.email) {
      isValid = false;
      newErrors.email = 'Email is required';
    }

    if (!formData.password) {
      isValid = false;
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res=await axios.post(`${process.env.REACT_APP_API}/user/login`,{...formData,role})
        console.log(res)
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("email",res.data.email)
        succesAlert(res.data.message)
        if(role=="developer"){
          navigate("/onboarding")
        }
        if(role=="client"){
          navigate("/client")
        }

      } catch (error) {
     
        console.log(error.response)
        errorAlert(error?.response
          ?.data?.error||"Error")
      }
    } else {
      console.log('Form has validation errors');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  return (
    <div className="flex min-h-full flex-col  justify-center px-6 py-12 lg:px-8  ">
      <ToastContainer/>
      <div className=' w-fit m-auto p-4 lg:w-1/2 shadow-orange-200 shadow-lg rounded-2xl'>
      <div className="flex justify-between items-center  sm:mx-auto sm:w-full sm:max-w-sm  flex-wrap gap-3 min-w-full p-3">
        <h2 className=" text-center  text-lg font-bold tracking-tight text-gray-900">{role.toLocaleUpperCase()} SignIn</h2>
        <label className="relative inline-flex justify-center items-center  cursor-pointer">
          <input
            type="checkbox"
            value={role}
            onChange={(e) => setRole(e.target.checked ? 'client' : 'developer')}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{role.toLocaleUpperCase()}</span>
        </label>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="text-left">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
               
                value={formData.email}
                onChange={handleChange}
                className={`block w-full rounded-md border-2 py-1.5 px-2 text-gray-900 transition ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600'
                }`}
              />
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                
                value={formData.password}
                onChange={handleChange}
                className={`block w-full rounded-md border-2 py-1.5 px-2 text-gray-900 transition ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600'
                }`}
              />
              {errors.password && <p className="mt-2 text-sm text-red-500 text-left">{errors.password}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign Up
          </Link>
        </p>
      </div>

      </div>
    </div>
  );
};

export default Login;
