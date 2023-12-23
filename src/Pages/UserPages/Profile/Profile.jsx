
import React, { useEffect, useState } from 'react';
import Header from '../../../Components/UserComponents/Header/Header';
import Footer from '../../../Components/UserComponents/Footer/Footer';
import { useSelector } from 'react-redux';
import { getUserDetails, setDetails } from '../../../Api/userApi';
import { useFormik } from 'formik';
import { editSchema } from '../../../validations/user/editValidaton';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Profile = () => {

  const [userData, setUserData] = useState();
  const { _id } = useSelector((state) => state.reducer.userReducer.user);
  const [isEditModalOpen, setEditModalOpen] = useState(false);


  const onSubmit = async () => {
    try {
      const response = await setDetails({ ...values, _id });

      setUserData(response.data.user);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });

      Toast.fire({
        icon: 'success',
        title: 'details edited',
      });

      closeModal();
    } catch (error) {
      console.log(error.message);
    }

  };


  const openModal = () => {
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setEditModalOpen(false);
  };


  useEffect(() => {

    getUserDetails(_id)
      .then((response) => {
        setUserData(response?.data?.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [setUserData]);


  const { name, email, mobile, age, gender, photo } = userData || {};





  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: name,
      mobile: mobile,
      age: age,
      gender: gender
    },
    validationSchema: editSchema,
    onSubmit,
    enableReinitialize: true

  });


  return (
    <div className='bg-blue-50'>
      <Header />

      <div className='h-screen bg-blue-50 container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center m-10 '>
        <div className='bg-white rounded-3xl shadow-2xl sm:col-span-9 md:col-span-9 lg:col-span-12 xl:col-span-12 shubham edit-input h-[700px] sm:w-full md:w-full lg:w-full xl:w-[1000px] m-10'>
          <div className='w-full h-20 bg-green-300 rounded-t-3xl text-center p-4 sm:p-6'>
            <h1 className='text-slate-950 text-xl sm:text-2xl md:text-3xl lg:text-2xl font-mono'>Profile</h1>
          </div>
          <div className='flex sm:flex-col md:flex-row lg:flex-row'>
            <div className='h-40 w-40 sm:h-40 sm:w-40 md:h-40 md:w-40 mx-16 mt-3 mb-3 rounded-full border'>
              <img
                className='h-full w-full rounded-full'
                src={photo ? photo : 'icon.jpg'}
                alt="Profile"
              />
            </div>

            <div className='flex justify-center'>
              <div className='text-2xl font-bold text-primary mt-20'>
                <p> Hi, {name}</p>
              </div>
            </div>
          </div>
          <hr />
          <div className='mx-auto max-w-md'>
            <div className='p-4    m-5 '>
              <div className='mb-4'>
                <p className='text-xl font-bold text-blue-500'>Name: <span className='text-black'>{name}</span></p>
              </div>
              <hr className='my-2' />
              <div className='mb-4'>
                <p className='text-xl font-bold text-blue-500'>Email: <span className='text-black'>{email}</span></p>
              </div>
              <hr className='my-2' />
              <div className='mb-4'>
                <p className='text-xl font-bold text-blue-500'>Mobile: <span className='text-black'>{mobile}</span></p>
              </div>
              <hr className='my-2' />
              <div className='mb-4'>
                <p className='text-xl font-bold text-blue-500'>Age: <span className='text-black'>{age}</span></p>
              </div>
              <hr className='my-2' />
              <div className='mb-4'>
                <p className='text-xl font-bold text-blue-500'>Gender: <span className='text-black'>{gender}</span></p>
              </div>
              <hr className='my-2' />
            </div>


            <br />
            <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row justify-center '>
              <button onClick={openModal} className="btn mb-2 sm:mb-0 md:mb-0 lg:mb-0 text-white mx-10 bg-green-300 ">Edit Details</button>
              <Link className="btn mb-2 sm:mb-0 md:mb-0 lg:mb-0 text-white bg-green-300 mx-10" to={'/appointments'}>My Appointments</Link>
              {/* <button className="btn mb-2 sm:mb-0 md:mb-0 lg:mb-0 text-white bg-green-300">My Reports</button> */}
            </div>
          </div>
        </div>
      </div>

      {
        isEditModalOpen && (
          <dialog open id="my_modal_1" className="modal">
            <div className="modal-box bg-white h-[500px ] text-black">
              <h3 className="font-bold text-lg">Edit User Details</h3>
              <br />
              <form onSubmit={handleSubmit} >
                <label htmlFor="username">Username:</label>
                <input
                  className='mx-14 text-black'
                  name='name'
                  type="text"
                  placeholder="Type name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}

                />
                <div>
                  {errors.name && touched.name && (
                    <p className="text-red-600">{errors.name}</p>
                  )}
                </div>
                <br />
                <br />

                <label htmlFor="mobile">Mobile:</label>
                <input
                  className='mx-20 text-black'
                  name='mobile'
                  type="text"
                  placeholder="Type number"
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div>
                  {errors.mobile && touched.mobile && (
                    <p className="text-red-600">{errors.mobile}</p>
                  )}
                </div>
                <br />
                <br />

                <label htmlFor="mobile">Age:</label>
                <input
                  className='mx-[95px] text-black'
                  type="text"
                  name="age"
                  placeholder='age'
                  value={values.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />  <div>
                  {errors.age && touched.age && (
                    <p className="text-red-600">{errors.age}</p>
                  )}
                </div>
                <br />
                <br />

                <label htmlFor="gender">Gender:</label>
                <select
                  className='mx-[72px] text-gray-500'
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="male">Select</option>

                  <option value="male">Male</option>
                  <option value="female">Female</option>

                </select>
                <div>
                  {errors.gender && touched.gender && (
                    <p className="text-red-600">{errors.gender}</p>
                  )}
                </div>



                <div className="modal-action mt-28 text-black">
                  <button type="button" className="btn" onClick={closeModal}>
                    Close
                  </button>
                  <button type="submit" className="btn bg-green-500 text-white" >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        )
      }


      <Footer />

    </div >
  );
};

export default Profile;