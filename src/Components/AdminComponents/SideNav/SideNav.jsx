import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => {
  return (
    <div className='bg-gray-800 text-white min-h-screen w-full sm:w-1/2 md:w-1/4 p-4'>
      <ul className='list-none p-0'>
        <li className='mb-2 hover:bg-gray-700 p-2 rounded'>
          <Link to={'/admin/dashboard'}> <div>DASHBOARD</div></Link>
        </li>
        <li className='mb-2 hover:bg-gray-700 p-2 rounded'>
          <Link to={'/admin/appointments'}><div>APPOINTMENTS</div></Link>
        </li>
        <li className='mb-2 hover:bg-gray-700 p-2 rounded'>
          <Link to={'/admin/userlist'}><div>USERS LIST</div></Link>
        </li>
        <li className='mb-2 hover:bg-gray-700 p-2 rounded'>
          <Link to={'/admin/doctorlist'}><div>DOCTORS LIST</div></Link>
        </li>
        <li className='mb-2 hover:bg-gray-700 p-2 rounded'>
          <Link to={'/admin/verifydoctors'}><div>VERIFY DOCTORS</div></Link>
        </li>
        <li className='mb-2 hover:bg-gray-700 p-2 rounded'>
          <Link to={'/admin/speciality'} ><div>SPECIALITIES</div></Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
