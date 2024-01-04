import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { appointmentList } from '../../../Api/doctorApi';
import { Button, Modal } from 'flowbite-react';
import { useNavigate, Link } from 'react-router-dom';
import { createChat } from '../../../Api/doctorApi'
import Swal from 'sweetalert2';
import { markasDone } from '../../../Api/doctorApi';

const AppointmentList = () => {
  const navigate = useNavigate();
  const [appo, setAppo] = useState([]);
  const [pagination, setPagination] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const doctor = useSelector((state) => state.reducer);
  const doctorData = doctor.doctorReducer.doctor;
  const id = doctorData._id;
  const [userId, setUserId] = useState()
  const [appoDate, setAppoDate] = useState()
  const [appoStart, setAppoStart] = useState()
  const [appoEnd, setAppoEnd] = useState()
  const [appoName, setAppoName] = useState()
  const [appoId, setAppoId] = useState()
  const [appoStatus, setAppoStauts] = useState()
  const [btn, setBtn] = useState(false);
  const [openModalx, setOpenModalx] = useState(false);
  const [currentDate, setCurrentDate] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 2;
  const appoDateAsDate = new Date(appoDate);
  const appDate = appoDateAsDate.toLocaleDateString();
  const currDateAsDate = new Date(currentDate);
  const currDate = currDateAsDate.toLocaleDateString();
  const [render, setRender] = useState(false)


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
  }, [id, currentPage, limit, render]);


  const handleId = (id) => {
    setUserId(id)
  }

  const handleClick = (date, start, end, name, id, status) => {

    setAppoDate(date)
    setAppoStart(start)
    setAppoEnd(end)
    setAppoName(name)
    setAppoId(id)
    setAppoStauts(status)
  }

  const handleAccept = async () => {
    try {
      const response = await createChat({ userid: userId, doctorid: id });
      setBtn(true);
      Swal.fire(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNavigate = () => {
    try {
      navigate('/doctor/chatpagedoctor');
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLinkClick = (event) => {
    event.preventDefault();

    const baseUrl = '/doctor/video';

    // Append the userId as a query parameter
    const urlToOpen = `${baseUrl}?userId=${userId}`;

    // Open the URL in a new tab
    window.open(urlToOpen, '_blank');
  };

  const handlePris = () => {
    navigate(`/doctor/priscription`, {
      state: {
        userName: appoName, date: appDate, start: appoStart, end: appoEnd, userId: userId, appoId: appoId
      }
    })
  }

  const handleReport = () => {
    navigate(`/doctor/medicalreport`, {
      state: {
        userName: appoName, date: appDate, appoId: appoId
      }
    })
  }

  const markAsDone = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to undo this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!"
      });

      if (result.isConfirmed) {
        const res = await markasDone(appoId);
        if (res.status === 200) {
          if (render === true) {
            setRender(false)
            setOpenModal(false)
          } else {
            setRender(true)
            setOpenModal(false)
          }
          Swal.fire({
            title: "Appointment marked as DONE!",
            icon: "success"
          });
        } else {
          Swal.fire({
            title: "Error",
            icon: "error"
          });
        }

      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <br />
      <div className='text-center text-2xl text-black'>
        <h1>Appointment List</h1>
      </div>
      <br />
      <div className='flex justify-center'>
        <div className='w-full lg:w-[1000px] bg-white min-h-[500px] rounded shadow-xl overflow-hidden'>
          {appo.length === 0 ? (
            <div className="text-center p-4 text-gray-600">
              No appointments available.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className='bg-green-400 rounded h-16'>
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
                      <td className="py-2 text-blue-600">{appointment.consultationDate}</td>
                      <td className="py-2">{appointment.createdAt}</td>
                      <td className="py-2">{appointment.start}</td>
                      <td className="py-2">{appointment.end}</td>
                      <td className={`py-2 ${appointment.status === 'Done' ? 'text-green-500' :
                        appointment.status === 'Cancelled' ? 'text-red-600' :
                          appointment.status === 'Pending' ? 'text-yellow-300' : ''}`}>
                        {appointment.status}
                      </td>

                      <td
                        onClick={() => {
                          setOpenModal(true);
                          handleId(appointment.userDetails._id);
                          handleClick(appointment.consultationDate, appointment.start, appointment.end, appointment.userDetails.name, appointment._id, appointment.status)

                        }}
                        className="py-2 text-cyan-500"
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
        <div className="flex justify-center mt-4 bg-blue-50">
          {Array.from({ length: pagination.totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`pagination-btn border w-10 ${index + 1 === currentPage ? "border-black" : "border-gray-300"}`}
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
            {currDate === appDate && currentTime >= appoStart && currentTime <= appoEnd && appoStatus === "Pending" ? (
              <React.Fragment>
                <p className='text-xl text-green-500 '>
                  You can now join the call
                </p>
                <Link to={'/doctor/video'} className='btn btn-secondary w-full' onClick={handleLinkClick}>
                  Start Video Call
                </Link>
              </React.Fragment>
            ) : (
              appoStatus === "Done" ? (
                <React.Fragment>
                  <div className='text-green-500'>
                    ADD MEDICAL REPORT AND  PRESCRIPTION
                  </div>
                </React.Fragment>
              ) : (
                <div className='text-orange-500'>
                  VIDEO CALL ROOM AVAILABLE IN THE DATE AND TIME
                </div>
              )
            )}
            <br />
            <button onClick={() => { setOpenModal(false); handlePris(); }} className='btn btn-primary w-full'>
              Add Prescription
            </button>
            <br />
            <button onClick={() => { setOpenModal(false); handleReport() }} className='btn btn-success w-full'>
              Add Medical Report
            </button>
            <br />
            {appoStatus === "Pending" ? (
              <button className='btn btn-warning w-full' onClick={markAsDone}>
                Mark As Done
              </button>
            ) : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {btn ? (
            <div className="flex justify-center">
              <Button
                className=" btn-primary"
                onClick={() => handleNavigate()}
              >
                Chat with patient
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              <Button className=" " onClick={() => setOpenModalx(true)}>
                Connect patient
              </Button>
            </div>
          )}
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={openModalx} onClose={() => setOpenModalx(false)}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="gray"
            onClick={() => {
              setOpenModalx(false);
              handleAccept();
            }}
          >
            I accept
          </Button>

          <Button onClick={() => setOpenModalx(false)}>Decline</Button>
        </Modal.Footer>
      </Modal>
    </div >

  );
};


export default AppointmentList;