import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../../Redux/UserSlice/UserSlice';
import Swal from 'sweetalert2';
// import good from '../../../Assets/icon/good.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRightToBracket, faUser,faUserDoctor, faBell,faCalendarCheck,faStethoscope, faComment } from '@fortawesome/free-solid-svg-icons';


const Header = () => {

  let token = localStorage.getItem('usertoken');
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

    localStorage.removeItem('usertoken');
    dispatch(userLogout({
      user: ''
    }));
    navigate('/');
  };

  return (
    <div className='navbar bg-white text-black  ' >
      <div className='navbar-start'>
        <div className='dropdown'>
          <label tabIndex={0} className='btn btn-ghost lg:hidden'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' /></svg>
          </label>

          {
            token ? 
            (
              <ul tabIndex={0} className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52'>
                <li><Link to='/'>HOME <FontAwesomeIcon icon={faHouse} /></Link></li>
                <li><Link to='/doctorlist'>DOCTORS <FontAwesomeIcon icon={faUserDoctor} /></Link></li>
                <li><Link to='/appointments'>APPOINTMENTS <FontAwesomeIcon icon={faCalendarCheck} /></Link></li>
                {/* <li><Link to=''>HEALTH RECORDS</Link></li> */}
                <li><Link to='/chatuser'>CHATS<FontAwesomeIcon icon={faComment} /></Link></li>
              </ul>) : (
              <ul tabIndex={0} className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'>
                <li><Link to='/'>HOME<FontAwesomeIcon icon={faHouse} /></Link></li>
                <li><Link to='/login'>LOGIN <FontAwesomeIcon icon={faRightToBracket} /></Link></li>
              </ul>
            )
          }

        </div>

        <Link to={'/'} className='btn btn-ghost normal-case text-xl'>HEALTH GOODY <FontAwesomeIcon icon={faStethoscope} /></Link>

      </div>

      {token ? (
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>
            <li><Link to='/'>HOME <FontAwesomeIcon icon={faHouse} /></Link></li>
            <li><Link to='/doctorlist'>DOCTORS <FontAwesomeIcon icon={faUserDoctor} /></Link></li>
            <li><Link to='/appointments'>APPOINTMENTS <FontAwesomeIcon icon={faCalendarCheck} /></Link></li>
            {/* <li><Link to=''>HEALTH RECORDS</Link></li> */}
            <li><Link to='/chatuser'>CHATS<FontAwesomeIcon icon={faComment} /></Link></li>

          </ul>
        </div>

      ) : (<div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <li><Link to='/'>HOME<FontAwesomeIcon icon={faHouse} /></Link></li>
          <li><Link to='/login'>LOGIN <FontAwesomeIcon icon={faRightToBracket} /></Link></li>
        </ul>
      </div>)
      }

      {
        token ? (
          <div className='navbar-end'>
            <FontAwesomeIcon icon={faBell} style={{color: "#000000",}} className='me-10' />
            <div className='dropdown dropdown-end'>
              <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
                <div className='w-10 rounded-full'>
                <FontAwesomeIcon icon={faUser} style={{color: "#000000",}}  className='h-12 w-5'/>
                  {/* <img src='icon.jpg' /> */}
                </div>
              </label>
              <ul tabIndex={0} className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52'>
                <li><Link to='/profile'>Profile</Link></li>
                <li><a onClick={handleLogout}>Logout</a></li>
              </ul>
            </div>
          </div>
        ) : (
          <div className='navbar-end'>
            <div className='dropdown dropdown-end'>
              <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
                <div className='w-10 rounded-full'>
                  <img src='icon.jpg' />
                </div>
              </label>
              {/* <ul tabIndex={0} className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'>
                <li><Link to='/login'>LOGIN</Link></li>
              </ul> */}
            </div>
          </div>
        )
      }


    </div>
  );
};

export default Header;