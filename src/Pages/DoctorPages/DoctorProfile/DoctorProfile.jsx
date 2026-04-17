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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faCalendarCheck,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Loading from "../../../Components/Loading/Loading";
import { editPhoto } from '../../../Api/doctorApi';

const DoctorProfile = () => {
  const [loadingx, setLoadingx] = useState(false);
  const doctor = useSelector((state) => state.reducer);
  const doctorData = doctor.doctorReducer.doctor;
  const [doc, setDoc] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const id = doctorData._id;
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState()
  const [change, setChange] = useState(false)


  useEffect(() => {
    setLoadingx(true);
    doctorDetails(id).then((res) => {
      setLoadingx(false);
      setDoc(res?.data?.doctor);
    }).catch((error) => {
      setLoadingx(false);
      console.log(error);
    });
  }, [render]);


  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    slotDuration: '5',
    date: '',
  });

  const handleSubmit2 = async (event) => {
    try {
      event.preventDefault(); // Prevent default form submission
      const response = await slotDetails({ id, formData });
      if (response?.data?.success === true) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
        });

        Toast.fire({
          icon: 'success',
          title: response?.data?.message,
        });
        setOpenModal(false);

      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
        });

        Toast.fire({
          icon: 'info',
          title: response?.data?.message,
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

  const onSubmit = async () => {
    setLoading(true);
    const response = await editProfile({ ...values, id });
    if (render) {
      setRender(false);
    } else {
      setRender(true);
    }
    setLoading(false);
    setOpenModal2(false);
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      didOpen: (toast) => {
      }
    });
    Toast.fire({
      icon: "success",
      title: response?.data?.message
    });
  };


  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: doc?.name,
      mobile: doc?.mobile,
      experience: doc?.experience,
      speciality: doc?.speciality,
      languages: doc?.languages,
      bio: doc?.bio,
    },
    validationSchema: drEditSchema,
    onSubmit,
    enableReinitialize: true,
  });



  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhotoToBase(selectedPhoto);
  };


  const setPhotoToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImg(reader.result);
      setChange(true)
    };
  };

  useEffect(() => {
    let debounceTimer;

    if (change) {
      // Debounce time set to 500 milliseconds (adjust as needed)
      debounceTimer = setTimeout(() => {
        async function edit() {
          const res = await editPhoto({ img, id });
          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            didOpen: (toast) => { }
          });
          Toast.fire({
            icon: "success",
            title: res?.data?.message
          });
          if (render) {
            setRender(false);
          } else {
            setRender(true);
          }
        }
        edit();
      }, 500);
    }

    // Cleanup the timer when the component unmounts or when change is false
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [change, img, id]);

  return (
    <>
      <Header />
      <div className='bg-blue-50 min-h-screen'>
        {
          loadingx ? (
            <div className="fixed inset-0 flex items-center justify-center min-h-screen">
              <div className="spinnerouter">
                <Loading />
              </div>
            </div>
          ) : (
            <div>
              {doc && (
                <div className='min-h-screen bg-blue-50 py-10 px-4'>
                  <div className='flex flex-col items-center max-w-5xl mx-auto'>
                    <div className='text-3xl font-bold text-black mb-10'>
                      <h1>Doctor Profile</h1>
                    </div>
                    <div className='flex flex-col lg:flex-row w-full gap-8 mb-10'>
                      {/* Avatar Card */}
                      <div className='bg-white w-full lg:w-1/3 rounded-2xl p-8 shadow-xl border border-gray-100 flex flex-col items-center'>
                        <label htmlFor='fileInput' className="cursor-pointer group relative">
                          <img
                            src={doc.photo || 'placeholder_image_url'}
                            alt='Doctor Profile'
                            className='rounded-full h-40 w-40 object-cover shadow-lg border-4 border-white transition-transform group-hover:scale-105'
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all">
                             <FontAwesomeIcon icon={faPenToSquare} className="text-white opacity-0 group-hover:opacity-100" />
                          </div>
                          <input
                            type='file'
                            id='fileInput'
                            accept='image/*'
                            style={{ display: 'none' }}
                            onChange={handlePhotoChange}
                          />
                        </label>

                        <div className="mt-6 text-center">
                          <h2 className='text-2xl font-bold text-gray-800'>{doc.name || 'Not added'}</h2>
                          <p className='text-sky-600 font-medium mb-2'>{doc.speciality || 'Not added'}</p>
                          <div className='inline-block bg-sky-50 px-4 py-1 rounded-full text-sm font-semibold text-sky-700'>
                            {doc.experience || '0'} Years Experience
                          </div>
                        </div>
                      </div>

                      {/* Info Card */}
                      <div className='bg-white w-full lg:w-2/3 rounded-2xl p-6 sm:p-10 shadow-xl border border-gray-100'>
                        <div className="space-y-6">
                          <div className="group">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</span>
                            <div className='border-b-2 border-gray-100 py-2 group-focus-within:border-sky-500 transition-colors'>
                              <span className='text-lg text-gray-800'>{doc.name || 'Not added'}</span>
                            </div>
                          </div>

                          <div className="group">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</span>
                            <div className='border-b-2 border-gray-100 py-2 group-focus-within:border-sky-500 transition-colors'>
                              <span className='text-lg text-gray-800'>{doc.email || 'Not added'}</span>
                            </div>
                          </div>

                          <div className="group">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mobile Number</span>
                            <div className='border-b-2 border-gray-100 py-2 group-focus-within:border-sky-500 transition-colors'>
                              <span className='text-lg text-gray-800'>{doc.mobile || 'Not added'}</span>
                            </div>
                          </div>

                          <div className="group">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Professional Bio</span>
                            <div className='bg-gray-50 rounded-xl p-4 mt-2'>
                              <p className='text-gray-700 leading-relaxed'>{doc.bio || 'Not added'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='flex flex-wrap justify-center gap-4 w-full'>
                      <button className='btn btn-primary px-8 h-12 rounded-xl flex items-center gap-2' onClick={() => setOpenModal2(true)}>
                        Edit Profile <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <Link to='/doctor/appointment' className='btn btn-success px-8 h-12 rounded-xl text-white flex items-center gap-2'>
                        Appointments <FontAwesomeIcon icon={faCalendarCheck} />
                      </Link>
                      <button className='btn btn-warning px-8 h-12 rounded-xl text-white flex items-center gap-2' onClick={() => setOpenModal(true)}>
                        Create Slots <FontAwesomeIcon icon={faPlus} />
                      </button>
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
                      <select
                        id='slotDuration'
                        name='slotDuration'
                        value={formData.slotDuration}
                        onChange={handleChange2}
                        className='bg-slate-500 text-white'
                        required
                      >
                        <option value='5'>5 minutes</option>
                        <option value='10'>10 minutes</option>
                        <option value='15'>15 minutes</option>
                        {/* Add more options as needed */}
                      </select>

                    </div>
                    <Modal.Footer>
                      <Button type='submit'>create</Button>
                      <Button color='gray' onClick={() => setOpenModal(false)}>
                        Decline
                      </Button>
                    </Modal.Footer>
                  </form>
                </Modal.Body>
              </Modal >


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

                      {/* <label htmlFor='speciality'>Speciality:</label>
                        <br />
                        <input type='text' id='speciality' name='speciality' className='w-full'
                          value={values.speciality}
                          onChange={handleChange}
                          onBlur={handleBlur} />
                        <div>
                          {errors.speciality && touched.speciality && (
                            <p className='text-red-600'>{errors.speciality}</p>
                          )}
                        </div> */}


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
              </Modal >

            </div>
          )

        }

      </div >
      <Footer />
    </>
  );
};

export default DoctorProfile;
