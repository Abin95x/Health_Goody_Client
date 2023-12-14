import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doctorDetails } from '../../../Api/userApi';
import { Button, Modal } from 'flowbite-react';
import { slotList } from '../../../Api/userApi';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { makePayment } from '../../../Api/userApi';
import { createChat } from '../../../Api/userApi';
import { useNavigate } from 'react-router-dom';


const DoctorDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openModalx, setOpenModalx] = useState(false);
    const [slots, setSlots] = useState([]);
    const [drId, setDrId] = useState();
    const [select, setSelect] = useState();
    const [date, setDate] = useState();
    const [btn,setBtn] = useState(false);
    const { _id } = useSelector((state) => state.reducer.userReducer.user);


    const price = {
        id: 'price_1OJ8AOSGxvp5pPKvCJFkai6w',
        amount: 299,
    };

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

    const handleChange = async (date) => {
        try {
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            if (date <= currentDate) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Date',
                    text: 'Please select a date in the future.',
                });
                return;
            }
            setDate(date);
            const response = await slotList(drId, date);

            const availableSlots = response.data.availableSlots;

            if (availableSlots && availableSlots.length > 0) {
                let allAvailableSlots = [];
                availableSlots.forEach(slot => {
                    slot.timeSlots.forEach(timeSlot => {
                        if (timeSlot.booked === false) {
                            allAvailableSlots.push(timeSlot);
                        } 
                    });
                });

                setSlots(allAvailableSlots);
            } else {
                console.log('No available slots for the given date.');
                setSlots([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelect = async (slotId) => {
        try {

            if (select === slotId) {
                setSelect(null);
            } else {
                setSelect(slotId);
            }
        } catch (error) {
            console.log(error.message);
        }
    }; 

    const handlePayment = async () => {
        try {
            if (select) {
                const response = await makePayment({ price, drId, select, date, _id });
                if (response.status === 200) {
                    console.log(response.data);
                    window.location.href = response.data.session.url;
                }
            }
        } catch (error) {
            console.log(error.mesage);
        }
    };

    const handleAccept = async ()=>{
        try{
            const response = await createChat({userid:_id,doctorid:id});
            setBtn(true);
            console.log(response,'res chattt');
            Swal.fire(response.data.message);

        }catch(error){
            console.log(error.message);
        }
    };

    const handleNavigate = ()=>{
        try{
            navigate('/chatuser');

        }catch(error){
            console.log(error.message);
        }
    };


    return (
        <div>
            {doctor && (
                <div className="min-h-screen bg-blue-50 flex justify-center">
                    <div className='bg-white w-full md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] rounded-xl shadow-2xl p-8 h-[600px] m-20 '>
                        <div className='flex justify-center'>
                            <img
                                className="mx-auto mb-4 h-40 w-40 rounded-full shadow-2xl"
                                src={doctor.photo}
                                alt={`Doctor ${doctor.name}`}

                            />
                        </div>
                        <h2 className='text-3xl text-center text-black'>{`Dr. ${doctor.name}`}</h2>
                        <p className='text-base text-center mb-4'>{`Bio: ${doctor.bio}`}</p>

                        <hr className='my-6 border-t border-gray-300' />
                        <div className='text-gray-700 text-xl'>
                            <p className='mb-4'>Price: ₹299</p>
                            <p className='text-base mb-4'>{`Speciality: ${doctor.speciality}`}</p>
                            <p className='text-base mb-4'>{`Experience: ${doctor.experience}`}</p>

                        </div>
                        <div className="flex justify-center">
                            <Button onClick={() => setOpenModal(true)}>View Slots</Button>
                        </div>
                        <br />
                        {btn ?  
                        <div className="flex justify-center">
                            <Button className='btn btn-primary' onClick={() => handleNavigate()}>Chat</Button>
                        </div>
                        :  
                        <div className="flex justify-center">
                            <Button className='btn btn-primary' onClick={() => setOpenModalx(true)}>Connect</Button>
                        </div>}
                     
                    </div>
                </div>
            )}

            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Select Date and Time</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <label htmlFor="datePicker">Select Date:</label>
                        <div className='flex justify-center'>
                            <Calendar onChange={(date) => handleChange(date)} />
                        </div>
                        <p>Available Slots:</p>
                        {slots.length > 0 ? (
                            <ul className="flex flex-wrap justify-center">
                                {slots.map((slot, index) => (
                                    <li key={index} className={`flex items-center h-10 w-36 bg-blue-500 m-2 p-2 rounded-xl text-white ${select === slot.objectId ? 'bg-green-500' : ''}`}>
                                        <input
                                            type="checkbox"
                                            id={`slot-${index}`}
                                            className="mr-2"
                                            checked={select === slot.objectId}
                                            onChange={() => handleSelect(slot.objectId)}
                                        />
                                        <label htmlFor={`slot-${index}`} className="flex-1">{`${slot.start} - ${slot.end}`}</label>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className='text-orange-600'>No available slots for the selected date.</p>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {slots.length > 0 && select && (
                        <div className=''>
                            <button className="btn btn-outline btn-primary" onClick={handlePayment}>
                                PAYMENT
                            </button>
                        </div>
                    )}
                </Modal.Footer>
            </Modal>

            <Modal show={openModalx} onClose={() => setOpenModalx(false)}>
                <Modal.Header>Terms of Service</Modal.Header>
                <Modal.Body>
                <div className="space-y-6">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
                    companies around the world are updating their terms of service agreements to comply.
                    </p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
                    to ensure a common set of data rights in the European Union. It requires organizations to notify users as
                    soon as possible of high-risk data breaches that could personally affect them.
                    </p>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button color="gray" onClick={() => { setOpenModalx(false); handleAccept(); }}>
                    I accept
                </Button>
                <Button onClick={() => setOpenModalx(false)}>Decline</Button>


                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default DoctorDetails;