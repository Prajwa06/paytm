import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-black text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
       
        <motion.div
          
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold  cursor-pointer"
        >
          PayEase
        </motion.div>
     

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-gray-300">
          {["Home", "About", "Features", "Contact"].map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1, color: "#fff" }}
              className="cursor-pointer transition"
            >
              {item}
            </motion.li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="space-x-4">
          <motion.button
            onClick={() => navigate("/signin")}
            whileHover={{ scale: 1.1 }}
            className="mt-3 px-5 py-3 rounded-full border-2 border-white
                   hover:from-purple-600 hover:to-blue-500 transition-all duration-300 ease-in-out 
                   shadow-lg text-white font-semibold text-md cursor-pointer"
          >
            Log In
          </motion.button>
          <motion.button
            onClick={() => navigate("/signup")}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 10px rgba(255, 0, 0, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="mt-3 px-5 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 
                             hover:from-purple-600 hover:to-blue-500 transition-all duration-300 ease-in-out 
                             shadow-lg text-white font-semibold text-md cursor-pointer"
          >
            Signup
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
