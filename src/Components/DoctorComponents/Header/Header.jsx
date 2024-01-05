import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doctorLogout } from '../../../Redux/DoctorSlice/DoctorSlice';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckToSlot, faUser, faCalendarCheck, faStethoscope, faComments, faChartSimple } from '@fortawesome/free-solid-svg-icons';



const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState()


  const handleLogout = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: 'info',
      title: 'Logged out successfully'
    });

    localStorage.removeItem('doctortoken');
    dispatch(doctorLogout({
      doctor: ''
    }));
    navigate('/doctor/doctorside');
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <div className='navbar bg-base-100'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-ghost lg:hidden'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' /></svg>
            </label>
            <ul tabIndex={0} className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'>
              <li><Link to='/doctor/dashboard'>DASHBOARD <FontAwesomeIcon icon={faChartSimple} /></Link></li>
              <li><Link to='/doctor/doctorprofile'>PROFILE <FontAwesomeIcon icon={faUser} /></Link></li>
              <li><Link to='/doctor/slots'>SLOTS<FontAwesomeIcon icon={faCheckToSlot} /></Link></li>
              <li><Link to='/doctor/chatpagedoctor'>CHATS <FontAwesomeIcon icon={faComments} /></Link></li>
              <li><Link to='/doctor/appointment'>APPOINTMENTS <FontAwesomeIcon icon={faCalendarCheck} /></Link></li>
            </ul>
          </div>
          <Link to={'/doctor/dashboard'} className='btn btn-ghost normal-case text-xl'>HEALTH GOODY <FontAwesomeIcon icon={faStethoscope} /></Link>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>
            <li><Link to='/doctor/dashboard'>DASHBOARD <FontAwesomeIcon icon={faChartSimple} /></Link></li>
            <li><Link to='/doctor/doctorprofile'>PROFILE<FontAwesomeIcon icon={faUser} /></Link></li>
            <li><Link to='/doctor/slots'>SLOTS <FontAwesomeIcon icon={faCheckToSlot} /></Link></li>
            <li><Link to='/doctor/appointment'>APPOINTMENTS <FontAwesomeIcon icon={faCalendarCheck} /></Link></li>
          </ul>
        </div>
        <div className='navbar-end'>

          {!isMobile && (
            <Link to='/doctor/chatpagedoctor' className='me-5 text-sm'>
              {/* CHATS <FontAwesomeIcon icon={faComments} className='mx-2' /> */}
              <div class="group relative">
                <button>
                  <svg
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    height="44"
                    width="44"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-8 hover:scale-125 duration-200 hover:stroke-blue-500"
                    fill="none"
                  >
                    <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
                    <path d="M8 9h8"></path>
                    <path d="M8 13h6"></path>
                    <path
                      d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"
                    ></path>
                  </svg>
                </button>
                <span
                  class="absolute -top-14 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100"
                >Comment <span> </span
                ></span>
              </div>

            </Link>

          )}
          {/* <button onClick={handleLogout} className='btn btn-error'>LogOut</button> */}
          <button onClick={handleLogout} class="cursor-pointer relative group overflow-hidden border-2 rounded-full px-8 py-2 border-green-500">
            <span class="font-bold text-white text-xl relative z-10 group-hover:text-green-500 duration-500">Log Out</span>
            <span class="absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:-translate-x-full h-full"></span>
            <span class="absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:translate-x-full h-full"></span>

            <span class="absolute top-0 left-0 w-full bg-green-500 duration-500 delay-300 group-hover:-translate-y-full h-full"></span>
            <span class="absolute delay-300 top-0 left-0 w-full bg-green-500 duration-500 group-hover:translate-y-full h-full"></span>
          </button>

        </div>
      </div>
    </div >
  );
};
export default Header;