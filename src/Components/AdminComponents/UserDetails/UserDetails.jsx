import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { userBlockUnblock } from '../../../Api/adminApi';

const UserDetails = () => {
    const location = useLocation();
    const userData = location.state && location.state.userData;
    console.log(userData,'ddddddddddddddddddddddddddddddddddddddddddddd')
    const navigate = useNavigate()

    const blockUnblock = async (id) => {
        try{
            console.log(id)
            const response = userBlockUnblock(id)
        // navigate("/admin/userdetails",{ state: { userData: userData } })

        }catch(error){
            console.log(error.message)
        }
    }

    return (
        <>
            <div className='flex-grow'>
                <div className="card w-[500px] h-[600px] bg-black text-white shadow-lg mx-8 mt-9 rounded-lg">
                    <div className="card-body p-8">
                        <h2 className="text-3xl font-bold mb-4">{userData.name}</h2>
                        <p className="text-gray-300">Id : {userData._id}</p>
                        <p className="text-gray-300">Email : {userData.email}</p>
                        <p className="text-gray-300">Mobile : {userData.mobile}</p>
                        <p className="text-gray-300">OTP Verified : {userData.otp_verified ? 'Yes' : 'No'}</p>
                        <p className="text-gray-300">Blocked : {userData.is_blocked ? 'Yes' : 'No'}</p>
                        <div className="flex justify-end mt-6">
                            <button className="btn bg-blue-500 hover:bg-blue-700 text-white mr-4">PREVIOUS APPOINTMENT</button>
                            <button className="btn bg-red-500 hover:bg-red-700 text-white" onClick={() => blockUnblock(userData._id)}>BLOCK</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserDetails