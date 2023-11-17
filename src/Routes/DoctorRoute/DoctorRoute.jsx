import React from 'react'
import { Routes, Route } from 'react-router-dom'

import DoctorSide from '../../Pages/DoctorPages/DoctorSide/DoctorSide'
import SignupPage from '../../Pages/DoctorPages/SignupPage/SignupPage'
import LoginPage from '../../Pages/DoctorPages/LoginPage/LoginPage'
import DoctorOtp from '../../Pages/DoctorPages/DoctorOtp/DoctorOtp'
import Dashboard from '../../Pages/DoctorPages/Dashboard/Dashboard'
import DoctorProtect from './DoctorProtect'
import DoctorPublic from './DoctorPublic'

const DoctorRoute = () => {
    return (
        <Routes>
            <Route path='/doctorside' element={<DoctorPublic><DoctorSide/></DoctorPublic>}/>
            <Route path='/signup' element={<DoctorPublic><SignupPage/></DoctorPublic>}/>
            <Route path='/login' element={<DoctorPublic><LoginPage/></DoctorPublic>}/>
            <Route path='/doctorotp' element={<DoctorPublic><DoctorOtp/></DoctorPublic>}/>
            <Route path='/dashboard' element={<DoctorProtect><Dashboard/></DoctorProtect>}/>

           
        </Routes>
    )
}

export default DoctorRoute  