import React from 'react'
import Home from './Pages/Home'
import {Routes,Route} from "react-router-dom"
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import DeveloperOnboardingForm from './Pages/DeveloperOnboardingForm'
import ClientPage from './Pages/ClientPage'
function MainRoutes({setupdate,update}) {
  return (
    <Routes>
      <Route path={""} element={<Home/>}/>
      <Route path={"/login"} element={<Login setupdate={setupdate} update={update}/>}/>
      <Route path={"/signup"} element={<SignUp/>}/>
      <Route path={"/onboarding"} element={<DeveloperOnboardingForm/>}/>
      <Route path={"/client"} element={<ClientPage/>}/>
    </Routes>
  )
}

export default MainRoutes