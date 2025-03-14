import React, { useEffect, useState } from "react";
import Navbarlogin from "../components/Navbarlogin";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DashBoard({user}) {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (!token) {
      navigate("/"); // Redirect to home if no token found
    }
  }, [navigate]);


  
  const [isOpen, setIsOpen] = useState(false);
  const[firstname,setFirstname]=useState();
  const[lastname,setLastname]=useState();
  const[password,setPassword]=useState();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const[balance,setBalance]=useState();
  const [,setError] = useState("");
  const [isSendMoneyOpen, setIsSendMoneyOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const[recipientId,setRecipientId]=useState("");
  // Function to fetch balance
  const fetchBalance = async () => {
    console.log("balance triggered")
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized! Please log in.");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/v1/account/balance", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBalance(response.data.balance); // Update state with new balance
      setError(""); // Clear errors if any
    } catch (error) {
      console.error("Error fetching balance:", error);
      setError(error.response?.data?.message || "Something went wrong!");
    }
  };
 
  useEffect(()=>{
    fetchBalance()
  },[balance])
      
  
 

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:5000/api/v1/user",
        {firstname,
          lastname,
          password
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log("Updated Info:", response.data);
      alert("Profile updated successfully!");
      setIsOpen(false); // Close modal after submission
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };
  

  

  // Search function
  const handleSearch = async(e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized! Please log in.");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/v1/user/bulk", {
        headers: { Authorization: `Bearer ${token}` },
        params: { filter: query },
      });
      
      if (response.data.filteredUsers?.length) {
        setResults(response.data.filteredUsers);
      } else {
        alert("No users found");
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
   
  };

 
 
 
  // Open send money modal
  const openSendMoneyModal = (user) => {
    setRecipient(user.username);
    setRecipientId(user._id);
    setIsSendMoneyOpen(true);
  };

  // Handle money transfer
  const handleTransfer =async () => {
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        alert("Unauthorized! Please log in.");
        return;
      }
  
      const response = await axios.post(
        "http://localhost:5000/api/v1/account/transfer",
        {
          amount,
          to: recipientId, // Receiver's user ID
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      alert(response.data.message); // Show success message
      alert(`Sent $${amount} to ${recipient}!`);
      fetchBalance(); // 🔄 Trigger balance update after transfer
    } catch (error) {
      console.error("Transfer Error:", error);
      alert(error.response?.data?.message || "Transfer failed!");
    }
   
    setIsSendMoneyOpen(false);
    setAmount("");

    
  };
  return (
    <div>
      <Navbarlogin />
      <div className="bg-black h-screen pt-24">
        {/* {dashboard} */}
        <div className="flex flex-col md:flex md:flex-row  mx-auto justify-between items-centre p-4 border w-80 md:w-2xl border-b-white border-2">
          <div className="flex justify-between ">
            <span className="font-semibold text-white text-xl m-5">
              {" "}
              Hello {user}!
            </span>
            {/* Edit Button */}
            <button
              className="px-4 py-2 mt-4  max-h-10 rounded-lg bg-yellow-500 text-white font-medium shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105"
              onClick={() => setIsOpen(true)}
            >
              Edit Info
            </button>
          </div>

          <span className="text-green-600 font-medium text-xl m-5">
            {" "}
            A/C Balance : {balance}
          </span>
        </div>
        <div className="flex mx-auto w-80 md:w-2xl items-center pt-5 px-3 ">
          <h1 className="text-white font-bold text-2xl">Tranfer Money...!</h1>
        </div>
        <div className="flex space-x-2  p-3 rounded-lg shadow-md w-80 md:w-2xl mx-auto pt-5">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Enter Recipants Name.."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className=" bg-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

         {/* Search Results */}
      {results.length>0 && <div className="mt-4 w-80 bg-white p-3 rounded-lg shadow-md mx-auto md:w-2xl">
        <h2 className="text-lg font-semibold mb-2">Results:</h2>
        {results.length > 0 ? (
          <ul className="space-y-2">
            {results.map((user, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 border-b last:border-none"
              >
                <span className="font-medium text-gray-800">{user.username}</span>
                <button
                  onClick={() => openSendMoneyModal(user)}
                  className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition"
                >
                  Send Money
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No results found.</p>
        )}
      </div>}

      {/* Send Money Modal */}
      {isSendMoneyOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Send Money</h2>
            <p className="text-gray-700 mb-2">
              To: <strong>{recipient}</strong>
            </p>

            {/* Amount Input */}
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 mb-4"
            />

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => setIsSendMoneyOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleTransfer}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Your Info</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  placeholder="Enter your first name"
                  onChange={(e)=> setFirstname(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Enter your last name"
                  onChange={(e)=> setLastname(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                  
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={(e)=> setPassword(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                 
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashBoard;
