import React, { useState } from "react";
import Navbarlogin from "../components/Navbarlogin";
import { motion } from "framer-motion";

function DashBoard() {
  const [balance, setBalance] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  return (
   <>
      <Navbarlogin />
      <div className="bg-black pt-24 h-screen flex justify-center ">
      <div className="max-w-4xl">
        <div className="width-full  flex justify-between items-center border-2 border-gray-500 rounded-lg m-5 ">
          <h1 className="text-white p-5 text-lg font-semibold">Hello, User!</h1>

          <div className="my-5 mx-16">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 10px rgba(255, 0, 0, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="mt-3 px-7 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 
                   hover:from-purple-600 hover:to-blue-500 transition-all duration-300 ease-in-out 
                   shadow-lg text-white font-semibold text-md cursor-pointer"
            >
              Get Balance
            </motion.button>

            {balance && (
              <h3 className="text-white text-lg mt-2 pl-3 underline ">
                A/C Balance: {balance}
              </h3>
            )}
          </div>
        </div>

        <div className="mx-5 mb-3 mt-10 ">
          <h1 className="text-white text-4xl font-bold">Transfer Money</h1>
        </div>

        <div class="w-full px-4">
          <input
            type="text"
            className="w-3xl px-4 py-4  border bg-white  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter recpiants name"
          />
        </div>

        <div className="mt-10 border-b-2 border-gray-500 mx-5 my-3 flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-white py-5">name</h3>
            <motion.button
                onClick={() => setIsOpen(prev =>!prev)}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 10px rgba(255, 0, 0, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="my-3 px-7 py-3 mr-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 
                   hover:from-purple-600 hover:to-blue-500 transition-all duration-300 ease-in-out 
                   shadow-lg text-white font-semibold text-md cursor-pointer"
            >
             Send Money
            </motion.button>
        </div>

        </div>
        </div>


        {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Send Money</h2>

            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              placeholder="Enter amount" 
              className="w-full border px-3 py-2 rounded mb-4" 
            />

            <div className="flex justify-between">
              <button 
                onClick={() => setIsOpen(false)} 
                className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button 
                onClick={() => { 
                  alert(`Money send Succesfully:  $${amount}`);
                  setIsOpen(false);
                }} 
                className="px-4 py-2 bg-green-500 text-white rounded">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
        </>
    
  );
}

export default DashBoard;
