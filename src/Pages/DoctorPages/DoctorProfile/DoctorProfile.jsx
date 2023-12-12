import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'flowbite-react';
import Header from '../../../Components/DoctorComponents/Header/Header';
import Footer from '../../../Components/DoctorComponents/Footer/Footer';
import { slotDetails } from '../../../Api/doctorApi';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import { doctorDetails } from '../../../Api/doctorApi';
import { editProfile } from '../../../Api/doctorApi';
import { drEditSchema } from '../../../validations/doctor/editValidation';
import { Link } from 'react-router-dom';



const DoctorProfile = () => {
  const doctor = useSelector((state) => state.reducer);
  const doctorData = doctor.doctorReducer.doctor;
  const [doc, setDoc] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const id = doctorData._id;
  // const [photo, setPhoto] = useState(null);
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    doctorDetails(id).then((res) => {
      setDoc(res.data.doctor);

    }).catch((error) => {
      console.log(error);
    });
  }, [render, doc]);

  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    slotDuration: '',
    date: '',
  });
  // console.log(formData)


  const handleSubmit2 = async (event) => {
    try {
      event.preventDefault(); // Prevent default form submission

      const response = await slotDetails({ id, formData });

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
        setOpenModal(false);


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

  const handleChange2 = (e) => {
    try {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    } catch (error) {
      console.log(error.message);
    }
  };
  const { name, mobile, experience, speciality, bio, languages } = doc || {};

  const onSubmit = async () => {
    setLoading(true);
    const response = await editProfile({ ...values, id });
    setRender(true);
    setLoading(false);
    setOpenModal2(false);
    console.log(response);

  };
  // const handlePhoto = (e) => {
  //   const selectedPhoto = e.target.files[0];
  //   setPhotoToBase(selectedPhoto);
  // };

  // const setPhotoToBase = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setPhoto(reader.result);
  //   };
  // };


  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: name,
      mobile: mobile,
      experience: experience,
      speciality: speciality,
      languages: languages,
      bio: bio,
    },
    validationSchema: drEditSchema,
    onSubmit,
    enableReinitialize: true,
  });

  // console.log(values);



  return (
    <>
      <Header />
  
      {doc && (
  <div className='min-h-screen bg-blue-50'>
    <div className='flex flex-col items-center'>
      <div className='text-2xl text-gray-500 mt-5'>
        <h1>Doctor Profile</h1>
      </div>

      <div className='flex flex-col md:flex-row bg-blue-50'>
        <div className='bg-white w-full md:w-96 h-96 rounded-3xl m-2 md:m-32 mx-auto md:mx-6 shadow-2xl border text-center'>
          <div>
            <img
              src={doc.photo || 'placeholder_image_url'}
              alt='Doctor Profile'
              className='rounded-lg h-36 w-36 mx-auto m-10'
            />
            <p className='text-lg font-semibold'>
              <span className='font-semibold'>Name:</span> {doc.name || 'Not added'}
            </p>
            <p className='text-black'>
              <span className='font-semibold'>Speciality:</span> {doc.speciality || 'Not added'}
            </p>
            <p>
              Experience : <span className='text-black m-5'>{doc.experience || 'Not added'}</span>
            </p>
            <div className='rating'>
             
            <div className="rating rating-lg">
              <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" checked />
              <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
            </div>
            
            </div>
          </div>
        </div>

        <div className='bg-white w-full md:w-[600px] h-96 m-2 md:m-32 mx-auto md:mx-2 p-4 md:p-24 rounded-3xl shadow-2xl border flex flex-col justify-center'>
          <div>
            <span>Name</span>
            <div className='border border-zinc-500 rounded-xl h-10 md:w-96 mx-auto'>
              <span className='text-black m-2'>{doc.name || 'Not added'}</span>
            </div>

            <span>Email</span>
            <div className='border border-zinc-500 rounded-xl h-10 md:w-96 mx-auto'>
              <span className='text-black m-2'>{doc.email || 'Not added'}</span>
            </div>

            <span>Mobile</span>
            <div className='border border-zinc-500 rounded-xl h-10 md:w-96 mx-auto'>
              <span className='text-black m-2'>{doc.mobile || 'Not added'}</span>
            </div>

            <span>Bio</span>
            <div className='border border-zinc-500 rounded-xl h-28 md:w-96 mx-auto'>
              <span className='text-black m-2'>{doc.bio || 'Not added'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col md:flex-row justify-center  md:space-x-5'>
        
        <Button onClick={() => setOpenModal2(true)}>EDIT</Button>
        <Button>
          <Link to='/doctor/appointment'>Appointments</Link>
        </Button>
        <Button onClick={() => setOpenModal(true)}>Create Slots</Button>
      </div>
    </div>
  </div>
)}




      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create Slots</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit2}>
            <div className='space-y-6 flex justify-center flex-col'>

              <label htmlFor='eventDate'>Date:</label>
              <div className='flex justify-center ' >
                <Calendar onChange={(date) => handleChange2({ target: { name: 'date', value: date } })} value={formData.date} />
              </div>

              <label htmlFor='startTime'>Start Time:</label>
              <input
                type='time'
                id='startTime'
                name='startTime'
                value={formData.startTime}
                onChange={handleChange2}
                className='bg-slate-500 text-white'
                required
              />


              <label htmlFor='endTime'>Ending Time:</label>
              <input
                type='time'
                id='endTime'
                name='endTime'
                value={formData.endTime}
                onChange={handleChange2}
                className='bg-slate-500 text-white'
                required
              />

              <label htmlFor='eventDuration'>Duration (in minutes):</label>
              <input
                type='number'
                id='slotDuration'
                name='slotDuration'
                min='1'
                value={formData.slotDuration}
                onChange={handleChange2}
                className='bg-slate-500 text-white'
                required
              />

            </div>
            <Modal.Footer>
              <Button type='submit'>create</Button>
              <Button color='gray' onClick={() => setOpenModal(false)}>
                Decline
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>


      <Modal show={openModal2} onClose={() => setOpenModal2(false)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <form onSubmit={handleSubmit}>
              <label htmlFor='name'>Name:</label>
              <br />
              <input type='text' id='name' name='name' className='w-full'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur} />
              <div>
                {errors.name && touched.name && (
                  <p className='text-red-600'>{errors.name}</p>
                )}
              </div>
              <br />

              <label htmlFor='mobile'>Mobile:</label>
              <br />
              <input type='text' id='mobile' name='mobile' className='w-full'
                value={values.mobile}
                onChange={handleChange}
                onBlur={handleBlur} />
              <div>
                {errors.mobile && touched.mobile && (
                  <p className='text-red-600'>{errors.mobile}</p>
                )}
              </div>
              <br />

              <label htmlFor='experience'>Experience:</label>
              <br />
              <input type='text' id='experience' name='experience' className='w-full'
                value={values.experience}
                onChange={handleChange}
                onBlur={handleBlur} />
              <div>
                {errors.experience && touched.experience && (
                  <p className='text-red-600'>{errors.experience}</p>
                )}
              </div>
              <br />

              {/* <label htmlFor='languages'>Languages:</label>
              <br />
              <input type='text' id='languages' name='languages' placeholder='' className='w-full'
                value={values.languages}
                onChange={handleChange}
                onBlur={handleBlur} />
              <br /> */}

              <label htmlFor='speciality'>Speciality:</label>
              <br />
              <input type='text' id='speciality' name='speciality' className='w-full'
                value={values.speciality}
                onChange={handleChange}
                onBlur={handleBlur} />
              <div>
                {errors.speciality && touched.speciality && (
                  <p className='text-red-600'>{errors.speciality}</p>
                )}
              </div>
              <br />

              <label htmlFor='bio'>Bio:</label>
              <br />
              <textarea id='bio' name='bio' className='w-full' rows='4'
                value={values.bio}
                onChange={handleChange}
                onBlur={handleBlur}></textarea>
              <div>
                {errors.bio && touched.bio && (
                  <p className='text-red-600'>{errors.bio}</p>
                )}
              </div>
              <br />

              {/* <label htmlFor='photo'>Upload Photo:</label>
              <br />
              <input type='file' id='photo' name='photo' accept='image/ * ' className='w-full'
                value={values.photo}
                onChange={handlePhoto}
              />
              <br /> */}
              <br />

              <div className=' flex justify-center'>
                {loading && <span className='loading loading-dots loading-lg'></span>}

              </div>
              <button type='submit' className='btn bg-green-500 text-white'  >
                Save Changes
              </button>


            </form>
          </div>
        </Modal.Body >
        {/* <Modal.Footer>
         
                 <Button type='submit' onClick={() => setOpenModal2(false)}>Done</Button>
          <Button color='gray' onClick={() => setOpenModal2(false)}>
            Decline
          </Button>
        </Modal.Footer> */}
      </Modal >
      <Footer />
    </>
  );
};

export default DoctorProfile;
