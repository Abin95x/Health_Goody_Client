import React from 'react'
import { Route,Routes } from 'react-router-dom'

import LoginPage from '../../Pages/AdminPages/LoginPage/LoginPage'
import Dashboard from '../../Pages/AdminPages/Dashboard/Dashboard'
import UserListPage from '../../Pages/AdminPages/UserListPage/UserListPage'
import UserDetailsPage from '../../Pages/AdminPages/UserDetailsPage/UserDetailsPage'
import DoctorListPage from '../../Pages/AdminPages/DoctorListPage/DoctorListPage'
import VerifyDoctor from '../../Pages/AdminPages/VerifyDoctor/VerifyDoctor'
import DoctorDetailsPage from '../../Pages/AdminPages/DoctorDetailsPage/DoctorDetailsPage'
import Appointment from '../../Pages/AdminPages/Appointment/Appointment'



const AdminRoute = () => {
  return (
    <Routes>
        <Route path='/adminlogin' element={<LoginPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/userlist' element={<UserListPage/>}/>
        <Route path='/userdetails' element={<UserDetailsPage/>}/>
        <Route path='/doctorlist' element={<DoctorListPage/>}/>
        <Route path='/verifydoctors' element={<VerifyDoctor/>}/>
        <Route path='/appointments' element={<Appointment />}/>
        <Route path='/doctordetails' element={<DoctorDetailsPage />}/>


    </Routes>
    
  )
}

export default AdminRoute