import React from "react";
import { motion } from "framer-motion";
import Navbarlogin from "../components/Navbarlogin";

const Signup = () => {
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
                    type="text"
                    name="firstName"
                    className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="text-gray-300 text-sm block mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label className="text-gray-300 text-sm block mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  placeholder="Username"
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-300 text-sm block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="email"
                  className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  placeholder="Password"
                />
              </div>

              {/* Sign Up Button */}
              <motion.button
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
                <button className="hover:text-white transition">
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
