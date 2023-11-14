import React from 'react'
import { Routes, Route } from "react-router-dom";

import Home from '../Pages/UserPages/Home/Home'
import LoginPage from '../Pages/UserPages/LoginPage/LoginPage';
import SignupPage from '../Pages/UserPages/SignupPage/SignupPage';
import Otp from '../Pages/UserPages/Otp/Otp';
import ForgotPassword from '../Pages/UserPages/ForgotPassword/ForgotPassword';
import ResetPassword from '../Pages/UserPages/ResetPassword/ResetPassword';
import UserPublic from './UserPublic';

// import UserProtect from './UserProtect';


const userRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<UserPublic><LoginPage /></UserPublic>} />
      <Route path='/signup' element={<UserPublic><SignupPage /></UserPublic>} />
      <Route path="/userotp" element={<UserPublic><Otp /></UserPublic>} />
      <Route path="/forgotpassword" element={<UserPublic><ForgotPassword /></UserPublic>} />
      <Route path="/resetpassword" element={<UserPublic><ResetPassword /></UserPublic>} />

    </Routes>
  )
}

export default userRoute