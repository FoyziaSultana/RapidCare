import { Cross, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { isLoggedIn, logoutUser } from "../checkLoginStatus/isLoggedIn";

function Navbar() {

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
      setLoggedIn(isLoggedIn());
  }, []);

  const handleLogout = () => {

      logoutUser();

      setLoggedIn(false);

      navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200">
      <nav className="max-w-7xl mx-auto h-[83px] px-6 flex items-center justify-between">

        
        <div className="flex items-center gap-2.5">

          <div className="w-9 h-9 bg-teal-600 rounded-lg flex items-center justify-center">
            <Cross
              size={20}
              strokeWidth={3}
              className="text-white"
            />
          </div>

          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Rapid<span className="text-teal-600">Care</span>
          </h1>

        </div>


        
        <div className="hidden md:flex items-center gap-7">

        
          <button
            className="
              px-3 py-2
              rounded-lg
              text-lg font-semibold
              text-slate-600
              hover:bg-teal-50
              hover:text-teal-700
              transition-colors duration-200
            "
          >
            Home
          </button>


          
          <button
            className="
              px-3 py-2
              rounded-lg
              text-lg font-semibold
              text-slate-600
              hover:bg-teal-50
              hover:text-teal-700
              transition-colors duration-200
            "
          >
            Find Hospitals
          </button>


        
          <button
            className="
              px-3 py-2
              rounded-lg
              text-lg font-semibold
              text-slate-600
              hover:bg-teal-50
              hover:text-teal-700
              transition-colors duration-200
            "
          >
            Blood Bank
          </button>


        
          <button
            className="
              px-3 py-2
              rounded-lg
              text-lg font-semibold
              text-slate-600
              hover:bg-teal-50
              hover:text-teal-700
              transition-colors duration-200
            "
          >
          Ambulance
          </button>
          <button
            className="
              px-3 py-2
              rounded-lg
              text-lg font-semibold
              text-slate-600
              hover:bg-teal-50
              hover:text-teal-700
              transition-colors duration-200
            "
          >
            About
          </button>
        </div>


      
        <div className="flex items-center gap-4">

        
          <button
            className="
              w-9 h-9
              flex items-center justify-center
              border border-slate-200
              rounded-lg
              text-slate-600
              hover:bg-slate-50
              hover:text-teal-600
              transition-colors duration-200
            "
          >
            <Bell size={18} />
          </button>


        {!loggedIn && (
    <>  
          <button
          onClick={() => navigate("/login")}
            className="
              text-sm
              text-xl font-semibold
              text-slate-800
              hover:text-teal-600
              transition-colors duration-200
            "
          >
            Sign in
          </button>


          
          <button
          onClick={() => navigate("/signup")}
            className="
              px-5 py-2.5
              bg-teal-600
              hover:bg-teal-700
              text-white
              text-lg
              font-semibold
              rounded-lg
              shadow-lg
              transition-colors duration-200
            "
          >
            Get Started
          </button>
        </>
)}
{loggedIn && (
    <>
        <button
            onClick={handleLogout}
            className="
              px-5 py-2.5 bg-teal-400 hover:bg-red-600 text-white text-lg
              font-semibold rounded-lg shadow-lg
              transition-colors duration-200
            "
        >
            Logout
        </button>
    </>
)}
        </div>

      </nav>
    </header>
  );
}

export default Navbar;