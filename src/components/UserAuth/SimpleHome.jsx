import React from 'react'
import { useUserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SimpleHome = () => {
    const {users,logOut}=useUserAuth();
    const navigate=useNavigate();
    const handleLogout=async()=>{
        try{
          await logOut();
          
            navigate('/');
          
          
        }catch(err){
          console.log("Error in logout function", err)
        }
      }
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
      <h2 className="text-2xl font-semibold mb-6">Welcome to the User Panel</h2>
      <div className="text-gray-70">
      Email: {users.email}
      </div>
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow-md mt-4"
      >
        Log out
      </button>
    </div>
  </div>
  )
}

export default SimpleHome