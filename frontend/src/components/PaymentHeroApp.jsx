import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PaymentAppHero = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center text-center text-white ">
      {/* Background Images */}
      <div
        className="md:hidden absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('/nathan-dumlao-lvWw_G8tKsk-unsplash.jpg')",
        }}
      ></div>
      <div
        className="hidden md:block absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('/ales-nesetril-ex_p4AaBxbs-unsplash.jpg')",
        }}
      ></div>

      {/* Centered Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10"
      >
        <h1 className="text-5xl md:text-7xl font-bold">
          Fast. Secure. Seamless.
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-gray-300">
          Experience next-level payments, anytime, anywhere.
        </p>
        <motion.button
          onClick={() => navigate("/signup")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-7 px-5 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 
                   hover:from-purple-600 hover:to-blue-500 transition-all duration-300 ease-in-out 
                   shadow-lg text-white font-semibold text-lg cursor-pointer"
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PaymentAppHero;
