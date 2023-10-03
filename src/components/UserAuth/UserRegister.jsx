import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const UserRegistration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);
  const { register } = useUserAuth();
  const navigate = useNavigate();

  function generateRandomId(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}

const randomId = generateRandomId();
console.log(randomId); // Output: "pR7aK3wB"




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Register the user with Firebase Authentication
      await register(email, password);
      generateRandomId()
      // Create a Firestore document for the user
      const userDocRef = doc(db, 'users', email); // 'users' is the collection name, and email is the document ID
      const userData = {
        randomId:randomId,
        email: email,
        role: role
      };

      // Set the user's data in Firestore
      await setDoc(userDocRef, userData);

      // Redirect to the login page
      navigate('/userLogin');
    } catch (err) {
      console.log('Error in Registration', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Register</h2>
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
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 text-sm font-medium mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              
              onChange={(e)=>setRole(e.target.value)}
            >
              <option value="" disabled selected>
                Select Role
              </option>
              <option value="user">User</option>
              <option value="admin">Administration</option>
            </select>
          </div>
          {/* <Link to='/UserLogin'> */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
          >
            Register
          </button>
          {/* </Link> */}
          
        </form>
        <p className="text-sm mt-4">
          Already have an account?{' '}
          <Link to="/UserLogin" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegistration;
