import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doctorDetails } from '../../../Api/userApi';
import { Button, Modal } from 'flowbite-react';
import { slotList } from '../../../Api/userApi';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { makePayment } from '../../../Api/userApi';
import { PaymentWallet } from '../../../Api/userApi'




const DoctorDetails = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [slots, setSlots] = useState([]);
    const [drId, setDrId] = useState();
    const [select, setSelect] = useState();
    const [date, setDate] = useState();
    const navigate = useNavigate()
    const { _id } = useSelector((state) => state.reducer.userReducer.user);

    const price = {
        id: 'price_1OJ8AOSGxvp5pPKvCJFkai6w',
        amount: 299,
    };

    function getCurrentTime24() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();

        // Add leading zeros to minutes if needed
        minutes = minutes < 10 ? '0' + minutes : minutes;

        // Form the time string in 24-hour format
        const currentTime24 = `${hours}:${minutes}`;

        return currentTime24;
    }

    const currentTime = getCurrentTime24();

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

            if (date < currentDate) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Date',
                    text: 'Please select a date in the future.',
                });
                setSelect(null);
                setSlots([]);
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
                    window.location.href = response.data.session.url;
                }
            }
        } catch (error) {
            console.log(error.mesage);
        }
    };

    const walletPay = async () => {
        try {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-warning mx-5",
                },
                buttonsStyling: false
            });

            const result = await swalWithBootstrapButtons.fire({
                title: "Are you sure?",
                text: "You want to do payment from your wallet!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Do Payment!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true
            });

            if (result.isConfirmed) {
                const res = await PaymentWallet({ drId, select, date, _id });
                console.log(res);

                if (res.status === 200) {
                    Swal.fire({
                        title: "Insufficient Balance",
                        text: "No required amount in the wallet",
                        icon: "question"
                    });
                } else {
                    swalWithBootstrapButtons.fire({
                        title: "Payment Done!",
                        text: "Your money is transferred",
                        icon: "success"
                    });

                    setOpenModal(false);
                    navigate("/appointments")
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your wallet payment is cancelled",
                    icon: "error"
                });
            }

        } catch (error) {
            console.log(error.message);
        }
    };






    return (
        <div>
            {
                doctor && (
                    <div className="min-h-screen bg-blue-50 flex justify-center">
                        <div className='bg-white w-full md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] rounded-xl shadow-2xl p-8 h-[550px] m-20 '>
                            <div className='flex justify-center'>
                                <img
                                    className="mx-auto mb-4 h-40 w-40 rounded-full shadow-2xl"
                                    src={doctor.photo}
                                    alt={`Doctor ${doctor.name}`}

                                />
                            </div>
                            <h2 className='text-3xl text-center text-black'>{`Dr. ${doctor.name}`}</h2>
                            <br />
                            <p className='text-base text-center mb-4'> {doctor.bio ? doctor.bio : 'Bio not added'}</p>

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


                        </div>
                    </div>
                )
            }

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
                                {slots.map((slot, index) => {
                                    const slotStartTime = slot.start;
                                    const currentDate = new Date();
                                    let isSlotDisabled = false;

                                    if (date < currentDate) {
                                        if (slotStartTime < currentTime) {
                                            isSlotDisabled = true;
                                            console.log(isSlotDisabled);
                                        }
                                    }

                                    return (
                                        <li
                                            key={index}
                                            className={`flex items-center h-10 w-36 m-2 p-2 rounded-xl text-white ${select === slot.objectId ? 'bg-green-500' : ''
                                                } ${isSlotDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`}
                                        >
                                            <input
                                                type="checkbox"
                                                id={`slot-${index}`}
                                                className="mr-2"
                                                checked={select === slot.objectId}
                                                onChange={() => handleSelect(slot.objectId)}
                                                disabled={isSlotDisabled}
                                            />
                                            <label htmlFor={`slot-${index}`} className="flex-1">{`${slot.start} - ${slot.end}`}</label>
                                        </li>
                                    );
                                })}
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
                                ONLINE PAYMENT
                            </button>
                            <button className="btn btn-outline btn-warning mx-5" onClick={walletPay}>WALLET PAY</button>
                        </div>

                    )}
                </Modal.Footer>
            </Modal>





        </div >
    );
};

export default DoctorDetails;