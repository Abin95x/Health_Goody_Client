import React, { useEffect, useState } from 'react';
import { appointmentList } from '../../../Api/adminApi';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await appointmentList();
                console.log(response);
                setAppointments(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchAppointments();
    }, []);

    return (

        <div className='flex-grow'>
            <div className="text-sm breadcrumbs">
                <ul>
                    <li><a>DASHBOARD</a></li>
                    <li><a>VERIFY DOCTORS</a></li>
                </ul>
            </div>
            {appointments.length === 0 ? (
                <div className='flex justify-center text-2xl text-yellow-200'>
                    <p>No Appointments Found.</p>
                </div>
            ) : (
                <p>hello</p>
            )}
        </div>
    );
};

export default AppointmentList;
