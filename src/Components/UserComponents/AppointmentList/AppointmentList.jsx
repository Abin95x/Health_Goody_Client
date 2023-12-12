import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { appointmentList } from '../../../Api/userApi';
// import { drDataForAppointmentDetails } from '../../../Api/userApi';
import { Button, Modal } from 'flowbite-react';
import { cancelAppointment } from '../../../Api/userApi';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AppointmentList = () => { 
  const [openModal, setOpenModal] = useState(false);
  const [appo, setAppo] = useState([]);
  const [pagination, setPagination] = useState({});
  const user = useSelector((state) => state.reducer);
  const userData = user.userReducer.user;
  const id = userData._id;
  const [data,setData] = useState();
  const [currentDate,setCurrentDate] = useState();
  const [currentTime,setCurrentTime] = useState();
  const [render,setRender] = useState(false);


  console.log(currentDate);

  

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    appointmentList(id, currentPage, limit)
      .then((res) => {
        setAppo(res.data.data);
        setPagination(res.data.pagination);
        setCurrentDate(res.data.currentDate);
        setCurrentTime(res.data.currentTime);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [id, currentPage, limit,render]);

  const handleCancel = async (id) => {
    try {
      console.log(id);
  
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, cancel it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await cancelAppointment(id); // Wait for the cancellation request to complete
  
          Swal.fire({
            title: 'Deleted!',
            text: 'Your appointment has been cancelled.',
            icon: 'success'
          });
  
          setRender(true);
          console.log(response, 'resbro');
        }
      });
  
    } catch (error) {
      console.log(error.message);
    }
  };
  


  // const handleButtonClick = () =>{
    
  // };
console.log(data,'jfkdjf');

    return (

      <div className='bg-blue-50 w-screen overflow-x-auto'>
      <div className='min-h-[500px] flex justify-center '>
        <div className='bg-white min-h-[500px] min-w-[900px] m-10 rounded-2xl shadow-2xl'>
          <div className='text-center m-5'>
            <h1 className='text-lg text-blue-600'>Appointments</h1>
          </div>
          <hr className='border border-blue-300 mx-5'  />
          <div className='m-5 h-14 rounded-xl border flex justify-center overflow-x-auto'>
            <table className='table w-full text-black'>
              <tr className=''>
                <th className='p-2'>Doctor</th>
                <th className='p-2'>Appo. Date</th>
                <th className='p-2'>Booked Date</th>
                <th className='p-2'>Amount</th>
                <th className='p-2'>Timing</th>
                <th className='p-2'>Status</th>
                <th className='p-2'>More</th>
           
              </tr>
            </table>
          </div>
          <div className='m-5  min-h-[400px] rounded-xl border overflow-x-auto'>
            <div className='flex justify-center'>
              <table className='table w-full text-black '>
                {appo.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className='p-2'>{appointment.doctorDetails.name}</td>
                    <td className='p-2'>{appointment.consultationDate}</td>
                    <td className='p-2'>{appointment.createdAt}</td>
                    <td className='p-2'>299</td>
                    <td className='p-2'>{appointment.start} - {appointment.end}</td>
                    <td className='p-2'>{appointment.status}</td>
                    <td className='p-2 hover:cursor-pointer text-sky-600' onClick={() => {
                      setOpenModal(true);
                      setData(appointment);
                    }}>More</td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
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
      <br />
      {data && (
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Terms of Service</Modal.Header>
            <Modal.Body>
              <div className='space-y-6'>
                <p className='text-2xl leading-relaxed text-gray-500 dark:text-gray-400'>
                  Your appointment is scheduled for{' '}
                  <span className='text-red-600'>{data.consultationDate}</span> from{' '}
                  <span className='text-red-600'>{data.start}</span> to{' '}
                  <span className='text-red-600'>{data.end}</span>. Please be ready at
                  that time for your consultation.
                </p>
                <br />
                
                <div className='space-y-6'>
                
                
                { currentTime >= data.start && currentTime <=data.end? (
                  <React.Fragment>
                    <p className='text-xl text-green-500'>
                      You can now join the call
                    </p>
                    {/* <Button onClick={() => handleButtonClick()}></Button> */}
                    <Link to={'/video'} className='btn btn-secondary'>Start Video Call</Link>
                  </React.Fragment>
                ) : (
                  <p className='text-xl text-red-500'>
                    Video call and online chat options will not be available outside your
                    scheduled appointment time.
                    <br />
                    <br />
                    <br />
                    <button className='btn btn-error w-full' onClick={() => { handleCancel(data._id); setOpenModal(false); }}>Cancel Appointment</button>

                  </p>
                  
                )}
              </div>
              <br />

              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setOpenModal(false)}>Close</Button>
            </Modal.Footer>
          </Modal>
        )}


    </div>
    
    );
    
};

export default AppointmentList;


