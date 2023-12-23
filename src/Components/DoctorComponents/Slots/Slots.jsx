import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { slotList } from '../../../Api/doctorApi';
import { Button, Modal } from 'flowbite-react';

const Slots = () => {
    const doctor = useSelector((state) => state.reducer);
    const doctorData = doctor.doctorReducer.doctor;
    const [slots, setSlots] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const id = doctorData._id;
    const [selectedSlot, setSelectedSlot] = useState(null);

    useEffect(() => {
        slotList(id)
            .then((response) => {
                setSlots(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handeClick = (id) => {
        try {
            const selectedSlot = slots.find((slot) => slot._id === id);
            setSelectedSlot(selectedSlot);
            setOpenModal(true);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-blue-50">

            <br />
            <div className='text-center text-2xl text-black'>
                <h1>Slots List</h1>
            </div>
            <br />
            <div className='flex justify-center'>
                <div className='w-full lg:w-[800px] bg-white min-h-[500px] rounded-xl shadow-2xl overflow-hidden'>
                    {slots.length === 0 ? (
                        <div className="text-center py-6">
                            <p className="text-gray-500 text-lg">No slots added</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                {/* head */}
                                <thead className='bg-amber-200 rounded-t-xl'>
                                    <tr className="text-black">
                                        <th className="py-2">No</th>
                                        <th className="py-2">Date</th>
                                        <th className="py-2">Starting Time</th>
                                        <th className="py-2">Ending Time</th>
                                        <th className="py-2">Duration</th>
                                        <th className="py-2">VIEW SLOTS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {slots.map((slot, index) => (
                                        <tr key={slot._id} className="text-black">
                                            <td className="py-2">{index + 1}</td>
                                            <td className="py-2">{new Date(slot.date).toLocaleDateString()}</td>
                                            <td className="py-2">{slot.startTime}</td>
                                            <td className="py-2">{slot.endTime}</td>
                                            <td className="py-2">{slot.slotDuration}</td>
                                            <td className="py-2">
                                                <button onClick={() => handeClick(slot._id)} className="text-blue-500 hover:underline">Details</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <br />
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header className="bg-white ">Time Slots</Modal.Header>
                <Modal.Body>
                    {selectedSlot && (
                        <div>
                            <p className="text-lg font-bold mb-4">Slot {slots.indexOf(selectedSlot) + 1}</p>
                            <div className='grid gap-4'>
                                {selectedSlot.timeSlots.map((time, timeIndex) => (
                                    <div key={timeIndex} className="bg-white p-4 border rounded-md">
                                        <p className="text-xl font-semibold mb-2">Time: {time.start} - {time.end}</p>
                                        <p className={`text-${time.booked ? 'green' : 'red'}-600`}>
                                            Booked: {time.booked ? 'Yes' : 'No'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer className="bg-white p-4">
                    <Button className="bg-blue-500 text-white" onClick={() => setOpenModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Slots;
