import React from "react";
import PaymentAppHero from "../components/PaymentHeroApp";
import Navbar from "../components/Navbar";



const Landing = () => {
  return (
    <div className="relative w-full h-screen max-h-screen overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Mobile Background */}
        <div 
          className="md:hidden w-full h-full bg-cover bg-center opacity-30" 
          style={{ backgroundImage: "url('/nathan-dumlao-lvWw_G8tKsk-unsplash.jpg')" }}
        ></div>

        {/* Desktop Background */}
        <div 
          className="hidden md:block w-full h-full bg-cover bg-center opacity-30" 
          style={{ backgroundImage: "url('/ales-nesetril-ex_p4AaBxbs-unsplash.jpg')" }}
        ></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col h-full">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <PaymentAppHero />
        </div>
      </div>
    </div>
 
  );
};

export default Landing;
