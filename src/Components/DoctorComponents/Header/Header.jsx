import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { doctorLogout } from '../../../Redux/DoctorSlice/DoctorSlice'
import Swal from 'sweetalert2'


const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogout = () => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "info",
          title: "Logged out successfully"
        });

        localStorage.removeItem("doctortoken")
        dispatch(doctorLogout({
          doctor: ""
        }))
        navigate("/doctor/doctorside")
      }
  return (
    <div>
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Dashboard</a></li>
        <li><a>Appoinments</a></li>
      <li><a>Appoinments</a></li>


        <li><Link to="/doctor/doctorprofile">Profile</Link></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Doctor</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link to="/doctor/dashboard">Dashboard</Link></li>
      <li><a>Appoinments</a></li>
      <li><a>Slots</a></li>

      
      <li><Link to="/doctor/doctorprofile">Profile</Link></li>

    </ul>
  </div>
  <div className="navbar-end">
  <button onClick={handleLogout} className="btn btn-error">LogOut</button>

  </div>
</div>
    </div>
  )
}

export default Header