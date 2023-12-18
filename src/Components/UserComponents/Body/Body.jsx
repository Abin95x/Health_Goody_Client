import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import banner from '../../../Assets/image/home.jpeg';
import Review from '../../../Components/UserComponents/Review/Review';
import Speciality from '../../../Components/UserComponents/Speciality/Speciality';


const Body = () => {

  const navigate = useNavigate();
  let token = localStorage.getItem('usertoken');

  const doctorPage = () => {
    try {
      navigate('/doctor/doctorside');

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className=''>
      {/* Banner */}

      <div className='banner relative w-full h-screen bg-white'>
        <img
          src={banner}
          alt='Banner'
          className='w-full h-full object-cover'
        />

        <div
          className='text-white text-3xl md:text-4xl lg:text-5xl absolute top-0 left-0 w-full h-full flex items-center justify-center'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        >
          <div className='row'>
            <div className='col-md-6'>
              <div className='card ' style={{ alignSelf: 'flex-end', justifyContent: 'flex-end' }}>
                <div className='card-body'>
                  <h2 className='text-yellow-200'>How Doctor Consultation Works ?</h2>
                  
                  {/* <h2 className='card-title text-green-500'>HOW TO CONSULT A DOCTOR ONLINE VIA TEXT/VIDEO?</h2> */}
                  <h2 className='card-title text-white'>1 . Select the speciality</h2>
                  <h2 className='card-title text-white'>2 . Choose the doctor</h2>
                  <h2 className='card-title text-white'>3 . Book a slot</h2>
                  <h2 className='card-title text-white'>4 . Make payment</h2>
                  <h2 className='card-title text-white'>5 . Be present in the consult room on HEALTH GOODY at the time of consult</h2>


                  <br />
                  <button className='btn btn-outline btn-success'>Book Consultation Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className='bg-blue-50 py-24 sm:py-32'>
  <div className='mx-auto flex flex-wrap justify-center'>

    {/* Feature Card 1 */}
    <div className='card w-96 bg-white shadow-2xl text-primary-content mx-4'>
      <div className='max-w-md mx-auto rounded-md overflow-hidden md:max-w-2xl'>
        <img className='w-24 h-24' src='certified.svg' alt='' />
        <div className='p-5'>
          <h2 className='text-xl font-bold mb-2'>Certified Doctors</h2>
          <p className='text-sm text-gray-500'>
            We offer quality healthcare through our network of certified and experienced doctors.
          </p>
        </div>
      </div>
    </div>

    {/* Feature Card 2 */}
    <div className='card w-96 bg-white shadow-2xl text-primary-content mx-4'>
      <div className='max-w-md mx-auto rounded-md overflow-hidden md:max-w-2xl'>
        <img className='w-24 h-24' src='confidential.svg' alt='' />
        <div className='p-5'>
          <h2 className='text-xl font-bold mb-2'>100% Confidential</h2>
          <p className='text-sm text-gray-500'>
            All advice & consultations are completely confidential. You can also delete chats whenever you want.
          </p>
        </div>
      </div>
    </div>

    {/* Feature Card 3 */}
    <div className='card w-96 bg-white shadow-2xl text-primary-content mx-4'>
      <div className='max-w-md mx-auto rounded-md overflow-hidden md:max-w-2xl'>
        <img className='w-24 h-24' src='convenience.svg' alt='' />
        <div className='p-5'>
          <h2 className='text-xl font-bold mb-2'>Convenience</h2>
          <p className='text-sm text-gray-500'>
            Forget the hassle of long queues and rush hour. Seek expert opinion anytime, anywhere.
          </p>
        </div>
      </div>
    </div>

    {/* Feature Card 4 (Duplicate of Card 1 for demonstration) */}
    <div className='card w-96 bg-white shadow-2xl text-primary-content mx-4'>
      <div className='max-w-md mx-auto rounded-md overflow-hidden md:max-w-2xl'>
        <img className='w-24 h-24' src='certified.svg' alt='' />
        <div className='p-5'>
          <h2 className='text-xl font-bold mb-2'>Certified Doctors</h2>
          <p className='text-sm text-gray-500'>
            We offer quality healthcare through our network of certified and experienced doctors.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>


      
            <Speciality/>
      
    
     
      <Review />

      {/* Doctors */}
      {
        token ? (

          <div>

          </div>
        ) : (
          <div className='bg-yellow-50 h-96 text-center p-8 shadow-lg'>
            <br />
            <h1 className='text-3xl font-bold text-green-500 mb-4'>Are you a Doctor?</h1>
            <p className='text-lg text-black mb-6'>Join our panel of specialists and connect with your patients from anywhere.</p>
            <button className='btn btn-outline btn-success' onClick={doctorPage}>JOIN US</button>
          </div>
        )
      }



    </div>
  );
};

export default Body;
