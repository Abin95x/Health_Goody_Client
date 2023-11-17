import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { userList } from '../../../Api/adminApi';

export const UserList = () => {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate()

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
      console.log(id, "user list id")
      navigate(`/admin/userdetails/${id}`);
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li><a>DASHBOARD</a></li>
          <li><a>USER LIST</a></li>
        </ul>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
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

                  <button type='button' onClick={() => handleClick(user._id)}>
                    More Info
                    {/* <p>{user._id}</p> */}
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
