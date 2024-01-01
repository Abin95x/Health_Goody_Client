import React from 'react';
import { useNavigate } from 'react-router-dom';
import banner from '../../../Assets/image/home.jpeg';
import Speciality from '../../../Components/UserComponents/Speciality/Speciality';
import { Link } from 'react-router-dom';


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

                  <Link to={'/doctorlist'}>
                    <button className="relative w-full border hover:border-sky-600 duration-500 group cursor-pointer text-xl text-white textarea-bordered  overflow-hidden h-14  rounded-md bg-sky-800 p-2 flex justify-center items-center font-extrabold">
                      <div className="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-900 delay-150 group-hover:delay-75"></div>
                      <div className="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-800 delay-150 group-hover:delay-100"></div>
                      <div className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-700 delay-150 group-hover:delay-150"></div>
                      <div className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-600 delay-150 group-hover:delay-200"></div>
                      <div className="absolute z-10 w-10 h-10 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-500 delay-150 group-hover:delay-250"></div>
                      <div className="absolute z-10 w-5 h-5 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-400 delay-150 group-hover:delay-300"></div>
                      <div className="absolute z-1 w-16 h-1 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-300 delay-150 group-hover:delay-350"></div>
                      <p className=" z-10">Book Consultation Now</p>
                    </button>
                  </Link>
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
          {/* <div className='card w-96 bg-white shadow-2xl text-primary-content mx-4'>
            <div className='max-w-md mx-auto rounded-md overflow-hidden md:max-w-2xl'>
              <img className='w-24 h-24' src='certified.svg' alt='' />
              <div className='p-5'>
                <h2 className='text-xl font-bold mb-2'>Certified Doctors</h2>
                <p className='text-sm text-gray-500'>
                  We offer quality healthcare through our network of certified and experienced doctors.
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>



      <Speciality />



      {/* <Review /> */}

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

            <button onClick={doctorPage} className="cursor-pointer uppercase w-40 h-14 bg-yellow-200 rounded-xl text-gray-950 px-4 py-2 active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[0.5rem_0.5rem_#F44336,-0.5rem_-0.5rem_#00BCD4] transition">
              JOIN US
            </button>
          </div>
        )
      }



    </div >
  );
};

export default Body;
