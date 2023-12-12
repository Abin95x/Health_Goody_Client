import React from 'react';
import { Routes, Route } from 'react-router-dom';

import DoctorSide from '../../Pages/DoctorPages/DoctorSide/DoctorSide';
import SignupPage from '../../Pages/DoctorPages/SignupPage/SignupPage';
import LoginPage from '../../Pages/DoctorPages/LoginPage/LoginPage';
import DoctorOtp from '../../Pages/DoctorPages/DoctorOtp/DoctorOtp';
import Dashboard from '../../Pages/DoctorPages/Dashboard/Dashboard';
import DoctorProtect from './DoctorProtect';
import DoctorPublic from './DoctorPublic';
import DoctorProfile from '../../Pages/DoctorPages/DoctorProfile/DoctorProfile';
import DoctorSlotsPage from '../../Pages/DoctorPages/DoctorSlotsPage/DoctorSlotsPage';
import AppointmentPage from '../../Pages/DoctorPages/AppointmentPage/AppointmentPage';
import ChatPage from '../../Pages/DoctorPages/ChatPage/ChatPage';


const DoctorRoute = () => {
    return (
        <Routes>
            <Route path='/doctorside' element={<DoctorPublic><DoctorSide /></DoctorPublic>} />
            <Route path='/signup' element={<DoctorPublic><SignupPage /></DoctorPublic>} />
            <Route path='/login' element={<DoctorPublic><LoginPage /></DoctorPublic>} />
            <Route path='/doctorotp' element={<DoctorPublic><DoctorOtp /></DoctorPublic>} />
            <Route path='/dashboard' element={<DoctorProtect><Dashboard /></DoctorProtect>} />
            <Route path='/doctorprofile' element={<DoctorProtect><DoctorProfile /></DoctorProtect>} />
            <Route path='/slots' element={<DoctorProtect><DoctorSlotsPage /></DoctorProtect>} />
            <Route path='/appointment' element={<DoctorProtect><AppointmentPage /></DoctorProtect>} />
            <Route path='/chatpagedoctor' element={<DoctorProtect><ChatPage /></DoctorProtect>} />



        </Routes>
    );
};
export default DoctorRoute  ;