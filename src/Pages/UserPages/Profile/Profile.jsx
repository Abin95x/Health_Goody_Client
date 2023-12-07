
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
    enableReinitialize:true

  });


  return (
    <div className='bg-blue-50'>
      <Header />
      
      <div className='h-screen bg-blue-50 container mx-auto flex items-center justify-center'>
        <div className='bg-white rounded-3xl shadow-2xl col-lg-9 col-md-9 col-sm-12 col-xs-12 shubham edit-input h-[700px] w-[1000px]'>
          <div className='w-[1000px] h-20 bg-green-300 rounded-t-3xl text-center '>
            <h1 className='p-7 text-slate-950 text-2xl font-mono'>Profile</h1>
          </div>
          <div className='h-48 flex'>
            <div className='h-40 w-40 mx-16 mt-3 rounded-full border'>
              <img
                className='h-full w-full rounded-full'
                src={photo ? photo : 'icon.jpg'}
                alt="Profile"
              />
            </div>

            <div className='flex justify-center'>
              <div className='text-2xl font-bold text-primary mt-20'>
                <p> Hi,{name}</p>
              </div>
            </div>
          </div>
          <hr />
          <div className='mx-auto max-w-md'>
            <div className='p-4'>
              <div className='mb-4'>
                <p className='text-lg font-semibold'>Name: <span className='text-blue-500 px-20'>{name}</span></p>
              </div>
              <hr />
              <div className='mb-4'>
                <p className='text-lg font-semibold'>Email: <span className='text-blue-500 px-20'>{email}</span></p>
              </div>
              <hr />
              <div className='mb-4'>
                <p className='text-lg font-semibold'>Mobile: <span className='text-blue-500 px-[70px]'>{mobile}</span></p>
              </div>
              <hr />
              <div className='mb-4'>
                <p className='text-lg font-semibold'>Age: <span className='text-blue-500 px-[95px]'>{age}</span></p>
              </div>
              <hr />
              <div className='mb-4'>
                <p className='text-lg font-semibold'>Gender: <span className='text-blue-500 px-[67px]'>{gender}</span></p>
              </div>
              <hr />
            </div>
            <br />
            <div className='flex justify-between'>
              <button onClick={openModal} className="btn text-white bg-green-300">Edit Details</button>

              {/* <button></button> */}
              <Link className="btn text-white bg-green-300" to={'/appointments'}>My Appointments</Link>
              <button className="btn text-white bg-green-300">My Reports</button>
            </div>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
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
      )}


      <Footer />

    </div>
  );
};

export default Profile;