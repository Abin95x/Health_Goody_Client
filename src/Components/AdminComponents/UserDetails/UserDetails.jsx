import React, { useEffect, useState } from 'react';
import { userDetails, userBlockUnblock } from '../../../Api/adminApi';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
    console.log("user details")

    const [userData, setUserData] = useState(null);
    const { id } = useParams();


    useEffect(() => {
        userDetails(id)
            .then((res) => {
                setUserData(res?.data?.details)
            })
            .catch((error) => {
                console.log(error.message)
            })

    }, [id])

    const blockUnblock = async (userId) => {
        try {
            if (userData.is_blocked) {
                await userBlockUnblock(userId);
            } else {
                await userBlockUnblock(userId);
            }
            const res = await userDetails(id);
            setUserData(res?.data?.details);

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            {userData && (
                <div className="card w-[400px] bg-black shadow-xl mx-10 mt-9 rounded-xl">
                    <div className="card-body">
                        <h2 className="card-title text-3xl font-bold mb-4">{userData.name}</h2>
                        <p className="text-gray-300">Id : {userData._id}</p>
                        <p className="text-gray-300">Email : {userData.email}</p>
                        <p className="text-gray-300">Mobile : {userData.mobile}</p>
                        <p className="text-gray-300">OTP Verified : {userData.otp_verified ? 'Yes' : 'No'}</p>
                        <p className="text-gray-300">Blocked : {userData.is_blocked ? 'Yes' : 'No'}</p>
                        <p className="text-gray-300">Age : {userData.age || 'Not Added'}</p>
                        <p className="text-gray-300">Weight : {userData.weight || 'Not Added'}</p>
                        <p className="text-gray-300">Height : {userData.height || 'Not Added'}</p>
                        <p className="text-gray-300">Gender : {userData.gender || 'Not Added'}</p>

                    </div>
                    <div className="card-actions mx-[147px]">
                        <button
                            className="btn btn-primary"
                            onClick={() => blockUnblock(userData._id)}
                            style={{ backgroundColor: userData.is_blocked ? 'green' : 'red' }}
                        >
                            {userData.is_blocked ? 'UNBLOCK' : 'BLOCK'}
                        </button>

                    </div>
                    <br />
                </div>
            )}
        </>

    );
};

export default UserDetails;
