import { Link,useNavigate } from "react-router-dom";
import "./App.css";
import MainRoutes from "./MainRoutes";
import { useEffect, useState } from "react";

function App() {
  const [nav,setnav]=useState({role:"",islogin:false,email:""});
  const [update,setupdate]=useState(false)
  const navigate=useNavigate()
  function logout(){
    localStorage.removeItem("email")
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    setupdate(!update)
    navigate("/login")
    setnav({...nav,role:"",islogin:false,email:""});
  }
  useEffect(()=>{
    const authemail=localStorage.getItem("email");
    const token=localStorage.getItem("token");
    const role=localStorage.getItem("role");
   if(authemail&&token){
    setnav({...nav,role:role,islogin:true,email:authemail});
   }


  },[update])
  return (
    <div className="App">
       <nav className="flex justify-between p-3 text-white text-lg font-semibold  bg-lime-500 items-center text-center">
       
        <Link to="/" className="">Home</Link>
       
        <div className="text-center">
          {nav.islogin?<div className="flex justify-center gap-3"><button className="border px-2 p-1 rounded-lg" onClick={logout}>logout</button><p className="text-sm font-serif flex items-center justify-center">hi,{nav.role}</p></div>: <Link to="/login" >Login</Link>}
          </div>
      </nav>
      <MainRoutes update={update}setupdate={setupdate}/>
    </div>
  );
}

export default App;
