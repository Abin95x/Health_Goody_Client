
import React from 'react';

const SideNav = () => {
  return (
    <div className="bg-gray-800 text-white h-screen w-1/4 p-4">
      <div className="mb-8 text-2xl font-bold">ADMIN</div>
      <ul>
      <li className="mb-2 hover:bg-gray-700 p-2 rounded">
          <a href="#">Dashboard</a>
        </li>
        <li className="mb-2 hover:bg-gray-700 p-2 rounded">
          <a href="#">Appointments</a>
        </li>
        <li className="mb-2 hover:bg-gray-700 p-2 rounded">
          <a href="#">User List</a>
        </li>
        <li className="mb-2 hover:bg-gray-700 p-2 rounded">
          <a href="#">Doctor List</a>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
  