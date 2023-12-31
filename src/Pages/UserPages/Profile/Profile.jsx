
import React, { useEffect, useState } from 'react';
import Header from '../../../Components/UserComponents/Header/Header';
import Footer from '../../../Components/UserComponents/Footer/Footer';
import { useSelector } from 'react-redux';
import { getUserDetails, setDetails } from '../../../Api/userApi';
import { useFormik } from 'formik';
import { editSchema } from '../../../validations/user/editValidaton';
import Swal from 'sweetalert2';
import { Button, Modal } from 'flowbite-react';

const Profile = () => {
  const [userData, setUserData] = useState();
  console.log(userData);
  const { _id } = useSelector((state) => state.reducer.userReducer.user);
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const onSubmit = async () => {
    try {
      setOpenModalEdit(false)
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

  useEffect(() => {
    getUserDetails(_id)
      .then((response) => {
        setUserData(response?.data?.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [setUserData]);

  const { name, email, mobile, age, gender, photo, wallet } = userData || {};
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
      <div className='min-h-screen bg-blue-50 flex items-center justify-center'>
        <div className='bg-white p-8 rounded-lg shadow-2xl w-full md:w-[700px]'>
          <div className='h-10 w-full bg-blue-400 flex justify-center text-base text-black rounded-full'>
            <h1 className='pt-2'>PROFILE</h1>
          </div>
          <br />
          <div className='flex flex-col md:flex-row items-center justify-center md:justify-start'>
            <div className='h-24 w-24  bg-blue-500 rounded-full overflow-hidden border mb-4 md:mb-0 md:mr-4'>
              <img
                className='h-full w-full object-cover '
                src={photo ? photo : 'icon.jpg'}
                alt='Profile'
              />
            </div>
            <div>
              <h1 className='text-2xl font-semibold text-gray-800'>{name}</h1>
              <p className='text-sm text-gray-500'>{email}</p>
            </div>
          </div>
          <hr className='my-4' />
          <div className='mb-4'>
            <p className='text-sm font-semibold text-gray-600'>Mobile:</p>
            <p className='text-sm text-gray-800'>{mobile}</p>
          </div>
          <div className='mb-4'>
            <p className='text-sm font-semibold text-gray-600'>Age:</p>
            <p className='text-sm text-gray-800'>{age}</p>
          </div>
          <div className='mb-4'>
            <p className='text-sm font-semibold text-gray-600'>Gender:</p>
            <p className='text-sm text-gray-800'>{gender}</p>
          </div>
          <div className='flex flex-col md:flex-row items-center justify-center md:justify-between space-y-4 md:space-y-0 md:space-x-4'>
            <button
              onClick={() => setOpenModalEdit(true)}
              className='btn btn-outline btn-primary w-full md:w-36 text-white'
            >
              Edit Details
            </button>
            <button
              onClick={() => setOpenModal(true)}
              className='btn btn-outline btn-primary w-full md:w-36 text-white'
            >
              Wallet
            </button>
            <button className='btn btn-outline btn-primary w-full md:w-36 text-white'>
              My Reports
            </button>
          </div>
        </div>
      </div>


      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Wallet</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <h1 className='text-black'>Credits :  <span className='text-green-500'>  ₹{wallet}</span> </h1>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>History</Button>

        </Modal.Footer> */}
      </Modal>

      {/* edit--------------------------------------------------------------------------------------------------------- */}

      <Modal show={openModalEdit} onClose={() => setOpenModalEdit(false)}>
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} >
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-600">Username:</label>
              <input
                className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
                name='name'
                type="text"
                placeholder="Type name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name && (
                <p className="text-red-600 mt-2">{errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="mobile" className="block text-gray-600">Mobile:</label>
              <input
                className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
                name='mobile'
                type="text"
                placeholder="Type number"
                value={values.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.mobile && touched.mobile && (
                <p className="text-red-600 mt-2">{errors.mobile}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="age" className="block text-gray-600">Age:</label>
              <input
                className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
                type="text"
                name="age"
                placeholder='Age'
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.age && touched.age && (
                <p className="text-red-600 mt-2">{errors.age}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="gender" className="block text-gray-600">Gender:</label>
              <select
                className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
                id="gender"
                name="gender"
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="" disabled>Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && touched.gender && (
                <p className="text-red-600 mt-2">{errors.gender}</p>
              )}
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <Button type="submit" className="bg-blue-500 text-white">Save changes</Button>
              <Button color="gray" onClick={() => setOpenModalEdit(false)}>Decline</Button>
            </div>
          </form>

        </Modal.Body>
      </Modal>


      <Footer />

    </div >
  );
};

export default Profile;