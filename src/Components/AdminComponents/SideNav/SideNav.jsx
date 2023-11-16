import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => {
  return (
    <div className="bg-gray-800 text-white h-screen w-1/4 p-4">
      <ul className="list-none p-0">
        <li className="mb-2 hover:bg-gray-700 p-2 rounded">
          <Link to={"/admin/dashboard"}>DASHBOARD</Link>
        </li>
        <li className="mb-2 hover:bg-gray-700 p-2 rounded">
          <Link to={"/admin/appointments"}>APPOINTMENTS</Link>
        </li>
        <li className="mb-2 hover:bg-gray-700 p-2 rounded">
          <Link to={"/admin/userlist"}>USERS LSIT</Link>
        </li>
        <li className="mb-2 hover:bg-gray-700 p-2 rounded">
          <Link to={"/admin/doctorlist"}>DOCTORS LIST</Link>
        </li>
        <li className="mb-2 hover:bg-gray-700 p-2 rounded">
          <Link to={"/admin/verifydoctors"}>VERIFY DOCTORS</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
