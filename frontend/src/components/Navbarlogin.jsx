import React from 'react'
import { motion } from "framer-motion";
function Navbarlogin() {
  return (
    <nav className="w-full bg-black bg-opacity-80 backdrop-blur-md p-4 md:px-16 md:py-4  fixed top-0 left-0 z-50 flex items-center justify-between px-6 shadow-lg">
      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.5 }} 
        className="text-white text-2xl font-bold cursor-pointer"
       
      >
        PayEase
      </motion.div>

      {/* Logout Button */}
      <motion.button 
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px rgba(255, 0, 0, 0.5)" }}
        whileTap={{ scale: 0.95 }}
        className="mt-3 px-5 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 
                   hover:from-purple-600 hover:to-blue-500 transition-all duration-300 ease-in-out 
                   shadow-lg text-white font-semibold text-md cursor-pointer"
       
      >
        Logout
      </motion.button>
    </nav>
  )
}

export default Navbarlogin