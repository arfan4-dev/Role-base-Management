import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/AuthContext';
import  GoogleButton  from 'react-google-button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getUserRoleByEmail} from './getUserRole'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
const UserLogin = () => {
  const [email,setEmail]=useState(''); 
  const [password,setPassword]=useState('')
  const {login,signUpWithGoogle}=useUserAuth();
  const navigate=useNavigate();
  const handleSubmit=async (e)=>{

    e.preventDefault();
    try{


      await login(email,password);
        // Get the user's role based on their email
        const userRole = await getUserRoleByEmail(email);

        if (userRole==='admin') {
          // Do something with the user's role (e.g., store it in your state or context)
                  navigate('/home')

          console.log('User Role:', userRole);
        } else if(userRole==='user') {
          navigate('/simpleHome')
          console.log('User Role:', userRole);

        } else{
return <h2 className='text-2xl font-semibold mb-6'>
  User not found or no role associated
</h2>
        }
        console.log("Login Successfully")
      
     

    }catch(err){
      console.log('Error in Login',err)
    }
  }

async function  handleGoogleClick(){
  try{
    await signUpWithGoogle()
    navigate('/home')
  }catch(err){
    console.log('err in google signIn',err)
  }
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your email"
              required
              onChange={(e)=>setEmail(e.target.value)}

            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your password"
              required
              onChange={(e)=>setPassword(e.target.value)}

            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
          >
            Login
          </button>
        </form>
        <p className="text-sm mt-4">
          Don't have an account?{' '}
          <Link to="/userRegister" className="text-blue-500 hover:underline">
            Sign up here
          </Link>
        </p>
        <div className='flex justify-center items-center'>
          
        <GoogleButton 
        className='g-btn'
       type='dark'
       onClick={handleGoogleClick}
      />
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
