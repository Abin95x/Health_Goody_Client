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

    // const handleClick = () => {
    //     try {

    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

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

                < div className="overflow-x-auto">
                    <table className="table">

                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Consultation Date</th>
                                <th>Booked Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Status</th>
                                {/* <th>Slot ID</th> */}
                                <th>Appointment ID</th>
                                <th>Paymet ID</th>


                            </tr>
                        </thead>
                        <tbody>

                            {
                                appointments.map((app, index) => (
                                    <tr key={index} className="hover">
                                        <th>{index + 1}</th>
                                        <td>{app.consultationDate}</td>
                                        <td>{app.createdAt}</td>
                                        <td>{app.start}</td>
                                        <td>{app.end}</td>
                                        <td className={`${app.status === 'Pending' ? 'text-yellow-200' :
                                            app.status === 'Done' ? 'text-green-500' : ''
                                            }`}>
                                            {app.status}
                                        </td>                                        {/* <td>{app.slotId}</td> */}
                                        <td>{app._id}</td>
                                        <td>{app.paymentId}</td>


                                        <td>
                                            {/* < button type='button' onClick={() => handleClick()}>
                                                More Info
                                            </button> */}

                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div >
            )
            }
        </div >
    );
};

export default AppointmentList;
