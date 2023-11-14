import React from 'react'
import { Route,Routes } from 'react-router-dom'

import LoginPage from '../../Pages/AdminPages/LoginPage/LoginPage'
import Dashboard from '../../Pages/AdminPages/Dashboard/Dashboard'

const AdminRoute = () => {
  return (
    <Routes>
        <Route path='/adminlogin' element={<LoginPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>

    </Routes>
    
  )
}

export default AdminRoute