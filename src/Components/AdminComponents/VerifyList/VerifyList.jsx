import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { unVerifiedList } from '../../../Api/adminApi';



const VerifyList = () => {
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        unVerifiedList()
            .then((response) => {
                setDoctors(response.data.doctors);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    const handleClick = async (id) => {
        try {
            navigate(`/admin/verifiedDetails/${id}`);
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <>
            <div className="text-sm breadcrumbs">
                <ul>
                    <li><a>DASHBOARD</a></li>
                    <li><a>VERIFY DOCTORS</a></li>
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
                            <th>Speciality</th>
                            <th>Listed</th>
                            <th>More</th>
                        </tr>
                    </thead>
                    <tbody>

                        {doctors.map((doctor, index) => (
                            <tr key={index} className="hover">
                                <th>{index + 1}</th>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.mobile}</td>
                                <td>{doctor.speciality}</td>
                                <td>{doctor.is_blocked ? 'No' : 'Yes'}</td>
                                <td>
                                    <button type='button' onClick={() => handleClick(doctor._id)}>
                                        More Info
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default VerifyList