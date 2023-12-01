import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'flowbite-react';
import Header from '../../../Components/DoctorComponents/Header/Header';
import Footer from '../../../Components/DoctorComponents/Footer/Footer';
import { slotDetails } from '../../../Api/doctorApi';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Swal from 'sweetalert2'


const DoctorProfile = () => {
  const doctor = useSelector((state) => state.reducer);
  const doctorData = doctor.doctorReducer.doctor;


  const id = doctorData._id

  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    slotDuration: '',
    date: '',
  });
  console.log(formData)

  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault(); // Prevent default form submission

      const response = await slotDetails({ id, formData });
      console.log(response)
      if (response.data.success === true) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });

        Toast.fire({
          icon: 'success',
          title: response.data.message,
        });
        setOpenModal(false)


      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });

        Toast.fire({
          icon: 'info',
          title: response.data.message,
        });

      }


    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  const handleChange = (e) => {
    try {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-white">
        <div className="flex justify-center bg-white">
          <div className="bg-white w-96 h-96 rounded-3xl m-32 mx-6 shadow-2xl border border-black text-center">
            <div>
              <img
                src={doctorData.photo || 'placeholder_image_url'}
                alt="Doctor Profile"
                className="rounded-lg h-36 w-36 mx-auto m-10"
              />
              <p className="text-lg font-semibold">
                <span className="font-semibold">Name:</span> {doctorData.name || 'Not added'}
              </p>
              <p className="text-black">
                <span className="font-semibold">Speciality:</span> {doctorData.speciality || 'Not added'}
              </p>
              <p>
                Experience : <span className="text-black m-5">{doctorData.experience || 'Not added'}</span>
              </p>
              <p>
                Languages : <span className="text-black m-5">{doctorData.languages || 'Not added'}</span>
              </p>
              <div className="rating">
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
              </div>
            </div>
          </div>

          <div className="bg-white w-[600px] h-96 m-32 mx-2 p-24 rounded-3xl shadow-2xl border border-black bor flex flex-col justify-center">
            <div>
              <span>Name</span>
              <div className="border border-black h-10 w-96">
                <span className="text-black m-5">{doctorData.name || 'Not added'}</span>
              </div>

              <span>Email</span>
              <div className="border border-black h-10 w-96">
                <span className="text-black m-5">{doctorData.email || 'Not added'}</span>
              </div>

              <span>Mobile</span>
              <div className="border border-black h-10 w-96">
                <span className="text-black m-5">{doctorData.mobile || 'Not added'}</span>
              </div>

              <span>Bio</span>
              <div className="border border-black h-10 w-96">
                <span className="text-black m-5">{doctorData.bio || 'Not added'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-5">
          <button className="btn btn-primary">EDIT</button>
          <Button onClick={() => setOpenModal(true)}>Create Slots</Button>
        </div>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create Slots</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6 flex justify-center flex-col">

              <label htmlFor="eventDate">Date:</label>
              {/* <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              /> */}
              <div className='flex justify-center ' >
                <Calendar onChange={(date) => handleChange({ target: { name: "date", value: date } })} value={formData.date} />

              </div>
              <label htmlFor="startTime">Start Time:</label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className='bg-slate-500 text-white'
                required
              />

              <label htmlFor="endTime">Ending Time:</label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className='bg-slate-500 text-white'
                required
              />



              <label htmlFor="eventDuration">Duration (in minutes):</label>
              <input
                type="number"
                id="slotDuration"
                name="slotDuration"
                min="1"
                value={formData.slotDuration}
                onChange={handleChange}
                className='bg-slate-500 text-white'
                required
              />
              {/* <label htmlFor="eventDuration">Duration (in minutes):</label>
              <select
                id="slotDuration"
                name="slotDuration"
                value={formData.slotDuration}
                onChange={handleChange}
                className='bg-slate-500 text-white'
                required
              >
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
              </select> */}

            </div>
            <Modal.Footer>
              <Button type="submit">create</Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Decline
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      <Footer />
    </>
  );
};

export default DoctorProfile;
