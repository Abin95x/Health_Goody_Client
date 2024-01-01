import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { appointmentList, addReview } from "../../../Api/userApi";
import { Button, Modal } from "flowbite-react";
import { cancelAppointment } from "../../../Api/userApi";
import Swal from "sweetalert2";
import { createChat } from "../../../Api/userApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const AppointmentList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [appo, setAppo] = useState([]);
  const [pagination, setPagination] = useState({});
  const user = useSelector((state) => state.reducer);
  const userData = user.userReducer.user;
  const id = userData._id;
  const [data, setData] = useState();
  const [render, setRender] = useState(false);
  const [btn, setBtn] = useState(false);
  const [openModalx, setOpenModalx] = useState(false);
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.reducer.userReducer.user);
  const [drId, setDrId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [review, setReview] = useState()
  const [rating, setRating] = useState(2); // Assuming the default rating is 2


  const limit = 5;




  useEffect(() => {
    appointmentList(id, currentPage, limit)
      .then((res) => {
        setAppo(res.data.data);
        setPagination(res.data.pagination);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [id, currentPage, limit, render]);

  const handleCancel = async (id) => {
    try {

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await cancelAppointment({ id, userId: _id });


          Swal.fire({
            title: "Cancelled!",
            text: "Your appointment has been cancelled.",
            icon: "success",
          });
          if (render === true) {
            setRender(false);
          } else {
            setRender(true);
          }
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAccept = async () => {
    try {
      const response = await createChat({ userid: _id, doctorid: drId });
      setBtn(true);
      Swal.fire(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNavigate = () => {
    try {
      navigate("/chatuser");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePrescription = () => {
    try {
      navigate("/prescription", {
        state: {
          data: data
        }
      })
    } catch (error) {
      console.log(error.message);
    }
  };
  const isCancelDisabled = (appointmentDate, appointmentStartTime) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    const currentDateString = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${currentDay.toString().padStart(2, '0')}`;
    const currentTimeString = currentDate.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5);

    // Combine appointment date and time strings
    const combinedAppointmentDateTimeString = `${appointmentDate} ${appointmentStartTime}`;

    // Create Date objects for current date/time and appointment date/time
    const currentDateObject = new Date(`${currentDateString} ${currentTimeString}`);
    const appointmentDateObject = new Date(combinedAppointmentDateTimeString);

    // Compare timestamps to check if current date/time is greater than or equal to appointment date/time
    if (currentDateObject.getTime() >= appointmentDateObject.getTime()) {
      return true; // Disable the cancel button
    }

    return false; // Enable the cancel button
  };


  const handleChange = (e) => {
    try {
      e.preventDefault();

      if (e.target.name === 'reviewText') {
        const reviewValue = e.target.value;

        if (reviewValue.trim() !== '') {
          setReview(reviewValue);
        } else {
          console.error('Review text cannot be empty');
        }
      } else if (e.target.name === 'rating') {
        const ratingValue = parseInt(e.target.value, 10);

        if (!isNaN(ratingValue) && ratingValue >= 1 && ratingValue <= 5) {
          setRating(ratingValue);
        } else {
          console.error('Rating must be a number between 1 and 5');
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const res = await addReview({ userId: _id, drId, review, rating })
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div className="bg-blue-50 w-screen overflow-x-auto">
      <div className="min-h-[500px] flex justify-center">
        <div className="bg-white min-h-[500px] min-w-[900px] m-10 rounded-2xl shadow-2xl">
          <div className="text-center m-5">
            <h1 className="text-lg text-blue-600">Appointments</h1>
          </div>
          <hr className="border border-blue-300 mx-5" />
          <div className="m-5 h-14 rounded-xl border flex justify-center overflow-x-auto">
            <table className="table w-full text-black">
              <tr className="">
                <th className="">Doctor</th>
                <th className="">Appo.date</th>
                <th className="">Booked</th>
                <th className="">Amount</th>
                <th className="">Timing</th>
                <th className="">Status</th>
                <th className="">More</th>
              </tr>
            </table>
          </div>

          <div className="m-5 min-h-[400px] rounded-xl border overflow-x-auto">
            {appo.length === 0 ? (
              <div className="text-center p-5 text-gray-500">No appointments available</div>
            ) : (
              <div className="flex justify-center">
                <table className="table w-full text-black">
                  {appo.map((appointment) => (

                    <tr key={appointment.id}>
                      <td><Link to={`/doctordetails/${appointment.doctorDetails._id}`} className="">{appointment.doctorDetails.name}</Link></td>
                      <td className="text-blue-600">{appointment.consultationDate}</td>
                      <td className="">{appointment.createdAt}</td>
                      <td className="">299</td>
                      <td className="text-blue-600">
                        {appointment.start} - {appointment.end}
                      </td>
                      <td className={`${appointment.status === 'Pending' ? 'text-red-500' :
                        appointment.status === 'Done' ? 'text-green-500' :
                          ''
                        }`}>
                        {appointment.status}
                      </td>
                      <td
                        className="hover:cursor-pointer text-sky-600"
                        onClick={() => {
                          setOpenModal(true);
                          setData(appointment);
                          setDrId(appointment.doctorDetails._id);
                        }}
                      >
                        More
                      </td>
                    </tr>

                  ))}
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {
        pagination && pagination.totalPages && (
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
        )
      }
      <br />
      {
        data && (
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>More</Modal.Header>
            <Modal.Body>
              {data.status === "Done" ? (
                <form onSubmit={handleSubmit} onChange={handleChange} className="h-800">
                  <h1 className="text-3xl flex justify-center text-blue-500 pt">Consultation Completed</h1>

                  <div className="flex justify-center m-5">
                    <label htmlFor="reviewText" className="sr-only">
                      Add Your Review
                    </label>
                    <textarea
                      id="reviewText"
                      name="reviewText"
                      value={review}
                      onChange={handleChange}
                      className="w-full h-32 rounded-lg"
                      placeholder="Enter your review"
                      required
                    ></textarea>
                  </div>

                  <div className="rating flex justify-center">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <input
                        key={value}
                        type="radio"
                        id={`rating-${value}`}
                        name="rating"
                        value={value}
                        checked={rating === value}
                        className="mask mask-star-2 bg-green-500"
                      />
                    ))}
                  </div>

                  <div className="flex justify-center m-5">
                    <button type="submit" className="btn btn-outline">
                      Add Your Review
                    </button>
                  </div>
                </form>


              ) : (<div className="space-y-6">
                <p className="text-2xl leading-relaxed text-gray-500 dark:text-gray-400">
                  Your appointment is scheduled for{" "}
                  <span className="text-red-600">{data.consultationDate}</span>{" "}
                  from <span className="text-red-600">{data.start}</span> to{" "}
                  <span className="text-red-600">{data.end}</span>. Please be
                  ready at that time for your consultation.{" "}
                  {/* <span className="text-green-400">You will be notified</span> */}
                </p>

                <br />

                <div className="space-y-6">
                  <p className="text-xl text-red-500">
                    {!isCancelDisabled(data.consultationDate, data.start) ? (
                      <button
                        className="btn btn-error w-full"
                        onClick={() => {
                          handleCancel(data._id);
                          setOpenModal(false);
                        }}
                      >
                        Cancel Appointment
                      </button>
                    ) : (
                      <span className="text-gray-500">Cancel Appointment (Disabled)</span>
                    )}
                  </p>
                </div>
                <br />
              </div>)}

            </Modal.Body>
            <Modal.Footer className="flex justify-center">
              {/* <Button onClick={() => setOpenModal(false)}>Close</Button> */}
              {/* {data.status === "Done" ? (<h1></h1>) : (<h1></h1>)} */}
              {btn ? (
                <div className="flex justify-center">
                  <Button
                    className=" btn-primary"
                    onClick={() => handleNavigate()}
                  >
                    Chat with doctor
                  </Button>
                </div>
              ) : (
                <div className="flex justify-center">
                  <Button className=" " onClick={() => setOpenModalx(true)}>
                    Connect doctor
                  </Button>
                </div>
              )}
              <div className="flex justify-center">
                <Button>Reshedule</Button>
              </div>
              <div className="flex justify-center">
                <Button onClick={() => { handlePrescription() }}>Download prescription</Button>
              </div>
            </Modal.Footer>
          </Modal >
        )
      }

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
