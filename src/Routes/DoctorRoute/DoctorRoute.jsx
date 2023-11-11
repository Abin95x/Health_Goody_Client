import React from 'react'
import { Routes, Route } from 'react-router-dom'

import DoctorSide from '../../Pages/DoctorPages/DoctorSide/DoctorSide'
import SignupPage from '../../Pages/DoctorPages/SignupPage/SignupPage'
import LoginPage from '../../Pages/DoctorPages/LoginPage/LoginPage'

const DoctorRoute = () => {
    return (
        <Routes>
            <Route path='/doctorside' element={<DoctorSide/>}/>
            <Route path='/signup' element={<SignupPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>

           
        </Routes>
    )
}

export default DoctorRoute