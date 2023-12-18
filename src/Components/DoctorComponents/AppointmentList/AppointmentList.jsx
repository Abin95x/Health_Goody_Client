import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { appointmentList } from '../../../Api/doctorApi';
import { Button, Modal } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import {createChat} from '../../../Api/doctorApi'
import Swal from 'sweetalert2';


// import Swal from 'sweetalert2';

const AppointmentList = () => {
  const navigate = useNavigate();
  const [appo, setAppo] = useState([]);
  const [pagination, setPagination] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const doctor = useSelector((state) => state.reducer);
  const doctorData = doctor.doctorReducer.doctor;
  const id = doctorData._id;
  const [userId,setUserId] = useState()
  
  console.log(userId)
  // const [currentDate, setCurrentDate] = useState();
  // const [currentTime, setCurrentTime] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    appointmentList(id, currentPage, limit)
      .then((res) => {
        setAppo(res.data.data);
        setPagination(res.data.pagination);
        // setCurrentDate(res.data.currentDate);
        // setCurrentTime(res.data.currentTime);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [id, currentPage, limit,]);

  const handleId = (id)=>{
  
    setUserId(id)
  }

  const handleAccept = async ()=>{
    try{
        const response = await createChat({userid:userId,doctorid:id});
       
        console.log(response,'res chattt');
        Swal.fire(response.data.message);

    }catch(error){
        console.log(error.message);
    }
};

const handleNavigate = ()=>{
    try{
    navigate(('/doctor/chatpagedoctor'));

    }catch(error){
        console.log(error.message);
    }
};

  return (
    <div>
      <br />
      <div className='flex justify-center'>
        <div className='w-full lg:w-[1000px] bg-white min-h-[700px] rounded-xl shadow-2xl overflow-hidden'>
        {appo.length === 0 ? (
            <div className="text-center p-4 text-gray-600">
              No appointments available.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className='bg-green-400 rounded-t-xl'>
                  <tr className="text-black">
                    <th className="py-2">No</th>
                    <th className="py-2">User</th>
                    <th className="py-2">Appo.Date</th>
                    <th className="py-2">Booked Date</th>
                    <th className="py-2">Starting Time</th>
                    <th className="py-2">Ending Time</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">More</th>
                  </tr>
                </thead>
                <tbody>
                  {appo.map((appointment, index) => (
                    <tr key={appointment._id} className="text-black">
                      <td className="py-2">{index + 1}</td>
                      <td className="py-2">{appointment.userDetails.name}</td>
                      <td className="py-2">{appointment.consultationDate}</td>
                      <td className="py-2">{appointment.createdAt}</td>
                      <td className="py-2">{appointment.start}</td>
                      <td className="py-2">{appointment.end}</td>
                      <td className="py-2">{appointment.status}</td>
                      <td
                        onClick={() => {
                          setOpenModal(true);
                          handleId(appointment.userDetails._id);
                        }}
                        className="py-2"
                      >
                        more
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {pagination && pagination.totalPages && (
        <div className='flex justify-center mt-4 bg-blue-50'>
          {Array.from({ length: pagination.totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`pagination-btn border w-10 ${
                index + 1 === currentPage ? 'border-black' : 'border-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
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
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button onClick={() => { setOpenModal(false); handleAccept(); handleNavigate() }}>Chat</Button>

          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    
  );
};


export default AppointmentList;