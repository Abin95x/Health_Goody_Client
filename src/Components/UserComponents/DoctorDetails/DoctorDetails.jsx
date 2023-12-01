import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doctorDetails } from '../../../Api/userApi';
import { Button, Modal } from 'flowbite-react';
import { slotList } from '../../../Api/userApi';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Swal from 'sweetalert2';


const DoctorDetails = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [slots, setSlots] = useState([]);
    const [drId, setDrId] = useState();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlots, setSelectedSlots] = useState([]);
    // console.log(selectedDate)

    useEffect(() => {
        doctorDetails(id)
            .then(response => {
                setDoctor(response.data.details);
                setDrId(response.data.details._id);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    // useEffect(() => {
    //     if (drId) {
    //         slotList(drId,selectedDate)
    //             .then((response) => {
    //                 setSlots(response.data.data);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     }
    // }, [drId]);

   

    const handleChange = async (date) => {
        try {
        
            const response =  await slotList(drId,date)
            console.log(response)
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {doctor && (
                <div className="min-h-screen bg-white flex justify-center">
                    <div className='bg-white w-full md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] rounded-xl shadow-2xl p-8 h-[500px] m-20 '>
                        <div className='flex justify-center'>
                            <img
                                className="mx-auto mb-4 h-40 w-40 rounded-full shadow-2xl"
                                src={doctor.photo}
                                alt={`Doctor ${doctor.name}`}
                            />
                        </div>
                        <h2 className='text-3xl text-center text-black'>{`Dr. ${doctor.name}`}</h2>
                        <hr className='my-6 border-t border-gray-300' />
                        <div className='text-gray-700'>
                            <p className='text-base mb-4'>{`Speciality: ${doctor.speciality}`}</p>
                            <p className='text-base mb-4'>{`Language: ${doctor.language}`}</p>
                            <p className='text-base mb-4'>{`Experience: ${doctor.experience}`}</p>
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={() => setOpenModal(true)}>View Slots</Button>
                        </div>
                    </div>
                </div>
            )}

            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Select Date and Time</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <label htmlFor="datePicker">Select Date:</label>
                        <div className='flex justify-center'>
                            
                            <Calendar onChange={(date) => {
                                // setSelectedDate(date.getDate());
                                handleChange(date.getDate());
                            }}/>

                        </div>
                        <p>Available Slots:</p>
                        <ul>
                            {/* {selectedSlots.map((slot, index) => (
                                <li key={index}>
                                    {`Start Time: ${slot.start}, End Time: ${slot.end}`}
                                </li>
                            ))} */}
                        </ul>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DoctorDetails;
