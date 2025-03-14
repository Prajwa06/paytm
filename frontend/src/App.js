import {  Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import Signin from "./pages/Signin";
import DashBoard from "./pages/DashBoard";
import { useState } from "react";

function App() {

  const [user,setUser]=useState("");
  return (
    <div className="App">
     
        <Routes>
          <Route path="/" element={<Landing />} /> 
          <Route path="/signup"   element={<SignUp setUser={setUser} />} />
          <Route path="/signin" element={<Signin   setUser={setUser}/>} />
          <Route path="/dashboard"   element={<DashBoard  user={user}/>} />
        </Routes>
      
    </div>
  );
}

export default App;
