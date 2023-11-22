import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../Components/DoctorComponents/Header/Header';
import Footer from '../../../Components/DoctorComponents/Footer/Footer';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const DoctorProfile = () => {
  const doctor = useSelector((state) => state.reducer);
  const userData = doctor.doctorReducer.doctor;

  return (
    <>
      <Header />
      

      <div className='bg-white h-screen text-slate-950'>
        <br />
        <br />
        <div className='container mx-auto p-4'>
          <div className='max-w-2xl mx-auto bg-white p-6 rounded-md shadow-2xl'>
            <h1 className='text-2xl font-bold mb-4'>Doctor Profile</h1>
            <div>
              <img
                src={userData.photo || 'placeholder_image_url'}
                alt='Doctor Profile'
                className='rounded-full h-36 w-36 mx-auto mb-4'
              />
              <p className='text-lg font-semibold'>
                <span className='font-semibold'>Name:</span> {userData.name || 'Not added'}
              </p>
              <p className='text-black'>
                <span className='font-semibold'>Speciality:</span> {userData.speciality || 'Not added'}
              </p>
            </div>
            <div className='mt-4'>
            <div className='mt-4'>
              <p>
                <span className='font-semibold'>Email:</span> {userData.email || 'Not added'}
              </p>
              <p>
                <span className='font-semibold'>Mobile:</span> {userData.mobile || 'Not added'}
              </p>
             
            </div>
            {userData.certificates && (
              <div className='mt-4'>
                <p>
                  <span className='font-semibold'>Certificates:</span>{' '}
                  {userData.certificates.map((certificate, index) => (
                    <span key={index}>{certificate}, </span>
                  ))}
                </p>
              </div>
            )}
            {userData.languages && (
              <div className='mt-4'>
                <p>
                  <span className='font-semibold'>Languages:</span>{' '}
                  {userData.languages.map((language, index) => (
                    <span key={index}>{language}, </span>
                  ))}
                </p>
              </div>
            )}
            <div className='mt-4'>
              <p>
                <span className='font-semibold'>Experience:</span>{' '}
                {userData.experience || 'Not added'}
              </p>
              <p>
                <span className='font-semibold'>Languages:</span> {userData.languages || 'Not added'}
              </p>
            
              <p>
                <span className='font-semibold'>Rating:</span> {userData.rating || 'Not added'}
              </p>
            </div>
            <br />
            <div className=' bg-slate-400 h-40'>
                
            <p>
                <span className='font-semibold'>Bio:</span> {userData.bio || 'Not added'}
              </p>

            </div>
            </div>
            <br />  

            <Link to='/edit-profile'>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Edit Profile
              </button>
            </Link>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DoctorProfile;
