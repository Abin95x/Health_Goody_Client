import React, { useState, useEffect } from 'react';
import { userList } from '../../../Api/adminApi';
import { userDetails } from '../../../Api/adminApi';

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState();

  useEffect(() => {
    userList()
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleClick = async (id) => {
    try {
      const response = await userDetails(id);
      const data = response.data.details;
      setUserData(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li><a href="/">DASHBOARD</a></li>
          <li><a>USER LIST</a></li>
        </ul>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="hover">
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>
                  <button type='button' onClick={() => { document.getElementById('my_modal_5').showModal(); handleClick(user._id); }}>
                    More Info
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click the button below to close</p>
          <div className="modal-action">
            <form method="dialog">
              <div className="card-body">
                {userData ? (
                  <>
                    <h2 className="card-title text-3xl font-bold mb-4">{userData.name}</h2>
                    <p className="text-gray-300">Id : {userData._id}</p>
                    <p className="text-gray-300">Email : {userData.email}</p>
                    <p className="text-gray-300">Mobile : {userData.mobile}</p>
                    <p className="text-gray-300">OTP Verified : {userData.otp_verified ? 'Yes' : 'No'}</p>
                    <p className="text-gray-300">Blocked : {userData.is_blocked ? 'Yes' : 'No'}</p>
                    <p className="text-gray-300">Age : {userData.age || 'Not Added'}</p>
                    <p className="text-gray-300">Gender : {userData.gender || 'Not Added'}</p>
                  </>
                ) : (
                  <p>Loading user data...</p>
                )}
              </div>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
