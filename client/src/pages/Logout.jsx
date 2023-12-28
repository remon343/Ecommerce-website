import React, { useEffect } from 'react'
import {useAuth} from '../store/auth-context';
import { Navigate } from 'react-router-dom';
const Logout = () => {
const {LogoutUser} = useAuth();
useEffect(()=>{
    LogoutUser();
},[LogoutUser])
  return (
    <>
        <Navigate to="/login" />
    </>
  )
}

export default Logout