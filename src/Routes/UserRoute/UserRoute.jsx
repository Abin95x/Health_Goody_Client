import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../../Pages/UserPages/Home/Home';
import LoginPage from '../../Pages/UserPages/LoginPage/LoginPage';
import SignupPage from '../../Pages/UserPages/SignupPage/SignupPage';
import Otp from '../../Pages/UserPages/Otp/Otp';
import ForgotPassword from '../../Pages/UserPages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../Pages/UserPages/ResetPassword/ResetPassword';
import Profile from '../../Pages/UserPages/Profile/Profile';
import DoctorListPage from '../../Pages/UserPages/DocoterListPage/DoctorListPage';
import DoctorDetailsPage from '../../Pages/UserPages/DoctorDetailsPage/DoctorDetailsPage';
import PaymentSuccess from '../../Pages/UserPages/PaymentSuccess/PaymentSuccess';
// import Cancel from '../../Pages/UserPages/Cancel';
import AppointmentsPage from '../../Pages/UserPages/AppointmentsPage/AppointmentsPage';
import VideoPage from '../../Pages/UserPages/VideoPage/VideoPage';
import ChatPage from '../../Pages/UserPages/ChatPage/ChatPage';


import UserPublic from './UserPublic';
import UserProtect from './UserProtect';



const userRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<UserPublic><LoginPage /></UserPublic>} />
      <Route path='/signup' element={<UserPublic><SignupPage /></UserPublic>} />
      <Route path='/userotp' element={<UserPublic><Otp /></UserPublic>} />
      <Route path='/forgotpassword' element={<UserPublic><ForgotPassword /></UserPublic>} />
      <Route path='/resetpassword' element={<UserPublic><ResetPassword /></UserPublic>} />
      <Route path='/doctorlist' element={<UserProtect><DoctorListPage /></UserProtect>} />
      <Route path='/doctordetails/:id' element={<UserProtect><DoctorDetailsPage /></UserProtect>} />
      <Route path='/success' element={<UserProtect><PaymentSuccess /></UserProtect>} />
      <Route path='/profile' element={<UserProtect><Profile /></UserProtect>} />
      <Route path='/appointments' element={<UserProtect><AppointmentsPage /></UserProtect>} />
      <Route path='/video' element={<UserProtect><VideoPage/></UserProtect>}/>
      <Route path='/chatuser' element={<UserProtect><ChatPage/></UserProtect>}/>


    </Routes>
  );
};

export default userRoute;