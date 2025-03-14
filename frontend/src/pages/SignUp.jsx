import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbarlogin from "../components/Navbarlogin";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({setUser}) => {
 
  const [firstname,setFirstname]=useState("");
  const [lastname,setLastname]=useState("");
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();



  const signUp = async () => {
    try {
        setUser(username);
        const response =await axios.post("http://localhost:5000/api/v1/user/signup",{
          firstname,
          lastname,
          username,
          password
        });

        localStorage.setItem("token",response.data.token);
        setUsername("");
        setPassword(""); 
        setFirstname("");
        setLastname("");   
        navigate("/dashboard");

       
       
          
       
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  }
  return (
    <div className="relative w-full h-screen max-h-screen overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Mobile Background */}
        <div
          className="md:hidden w-full h-full bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/nathan-dumlao-lvWw_G8tKsk-unsplash.jpg')",
          }}
        ></div>

        {/* Desktop Background */}
        <div
          className="hidden md:block w-full h-full bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/ales-nesetril-ex_p4AaBxbs-unsplash.jpg')",
          }}
        ></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="min-h-screen  flex flex-col">
          <Navbarlogin /> {/* Navbar at the top */}
          {/* Centered Content */}
          <div className="flex flex-grow items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-md bg-opacity-20 backdrop-blur-lg border border-gray-700 shadow-xl p-8 rounded-2xl"
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-white text-3xl font-extrabold text-center mb-6"
              >
                Create Your Account
              </motion.h2>

              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-gray-300 text-sm block mb-2">
                    First Name
                  </label>
                  <input
                    onChange={(e)=>setFirstname(e.target.value)}
                    type="text"
                    name="firstName"
                    className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="John"
                    value={firstname}
                  />
                </div>
                <div>
                  <label className="text-gray-300 text-sm block mb-2">
                    Last Name
                  </label>
                  <input
                    onChange={(e)=>setLastname(e.target.value)}
                    type="text"
                    name="lastName"
                    className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Doe"
                    value={lastname}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label className="text-gray-300 text-sm block mb-2">
                  Username
                </label>
                <input
                  onChange={(e)=>setUsername(e.target.value)}
                  type="text"
                  name="username"
                  className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  placeholder="Username"
                  value={username}
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-300 text-sm block mb-2">
                  Password
                </label>
                <input
                  onChange={(e)=>setPassword(e.target.value)}
                  type="password"
                  name="email"
                  className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  placeholder="Password"
                  value={password}
                />
              </div>

              {/* Sign Up Button */}
              <motion.button
                onClick={signUp}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 15px rgba(0, 162, 255, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-lg transition font-semibold text-lg"
              >
                Sign Up
              </motion.button>

              {/* Extra Links */}
              <div className="text-gray-400 text-sm mt-4 text-center">
                <button onClick={()=>navigate("/signin")} className="hover:text-white transition">
                  Already have an account? Sign In
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
