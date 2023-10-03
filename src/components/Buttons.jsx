import React from "react";
import {Link} from 'react-router-dom'
const Buttons = () => {
  return (
    <div className="flex flex-col h-screen space-y-4 justify-center items-center">
      <span>
        <Link to='/userRegister'>
        <button className="w-60 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow-md">
        Register / Log in
        </button>
        </Link>
        
      </span>
      <span>
      
        
      </span>
    </div>
  );
};

export default Buttons;
