import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUserAuth } from './context/AuthContext';
const ProtectedRoute = ({children}) => {
    const {users}=useUserAuth();
    if(!users){
       return  <Navigate to='/'/>
    }
  return children
}

export default ProtectedRoute