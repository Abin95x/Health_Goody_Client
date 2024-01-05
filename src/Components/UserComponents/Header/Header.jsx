import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../../Redux/UserSlice/UserSlice';
import Swal from 'sweetalert2';
// import good from '../../../Assets/icon/good.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRightToBracket, faUser, faUserDoctor, faBell, faCalendarCheck, faStethoscope, faComment } from '@fortawesome/free-solid-svg-icons';


const Header = () => {

  let token = localStorage.getItem('usertoken');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      // timerProgressBar: true,
      // didOpen: (toast) => {
      //   toast.onmouseenter = Swal.stopTimer;
      //   toast.onmouseleave = Swal.resumeTimer;
      // }
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
          <div className='navbar-end '>
            <div className='hidden lg:flex'>
              <Link to='/chatuser' className='me-5 text-sm'  >
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

            </div>

            {/* <FontAwesomeIcon icon={faBell} style={{ color: "#000000", }} className='me-10' /> */}
            <div className='dropdown dropdown-end'>
              <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
                <div className='w-10 rounded-full'>
                  <FontAwesomeIcon icon={faUser} style={{ color: "#000000", }} className='h-12 w-5' />
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


    </div >
  );
};

export default Header;