import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRoute from './Routes/UserRoute/UserRoute';
import DoctorRoute from './Routes/DoctorRoute/DoctorRoute';
import AdminRoute from './Routes/AdminRoute/AdminRoute';
import VideoRoute from './Routes/VideoRoute/VideoRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={<UserRoute />} />
        <Route path='/doctor/*' element={<DoctorRoute />} />
        <Route path='/admin/*' element={<AdminRoute />} />
        <Route path='/video/*' element={<VideoRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
