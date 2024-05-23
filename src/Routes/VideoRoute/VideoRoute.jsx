import React from 'react'
import { Routes, Route } from 'react-router-dom';
import VideoProtect from './VideoProtect';
import VideoPage from '../../Pages/DoctorPages/VideoPage/VideoPage'

const VideoRoute = () => {
  return (
    <Routes>
        <Route path='/video' element={<VideoProtect><VideoPage /></VideoProtect>} />
    </Routes>
  )
}

export default VideoRoute