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
    console.log(slots)
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

    const handeClick =(id)=>{
        try{
            const selectedSlot = slots.find((slot) => slot._id === id);
            setSelectedSlot(selectedSlot);

            setOpenModal(true)

        }catch(error){
            console.log(error.message)
        }
    }

    return (
        <>
            <div className="min-h-screen bg-white">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-black">
                                <th>No</th>
                                <th>Date</th>
                                <th>Starting Time</th>
                                <th>Ending Time</th>
                                <th>Duration</th>
                                <th>VIEW SLOTS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {slots.map((slot, index) => (
                                <tr key={slot._id} className="text-black">
                                    <td>{index + 1}</td>
                                    <td>{new Date(slot.date).toLocaleDateString()}</td>
                                    <td>{slot.startTime}</td>
                                    <td>{slot.endTime}</td>
                                    <td>{slot.slotDuration}</td>
                                    <td>
                                        <button onClick={()=>handeClick(slot._id)}>details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Time Slots</Modal.Header>
        <Modal.Body>
            {/* Display details of the selected slot */}
            {selectedSlot && (
                <div className='border'>
                    <p>Slot {slots.indexOf(selectedSlot) + 1}</p>
                    {selectedSlot.timeSlots.map((time, timeIndex) => (
                        <div key={timeIndex}>{time}</div>
                    ))}
                </div>
            )}
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => setOpenModal(false)}>Done</Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
                Cancel
            </Button>
        </Modal.Footer>
    </Modal>


        </>
    );
};

export default Slots;
