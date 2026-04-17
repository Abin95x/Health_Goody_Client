import React from 'react';
// import { useNavigate } from 'react-router-dom';
import banner from '../../../Assets/image/home.jpeg';
import Speciality from '../../../Components/UserComponents/Speciality/Speciality';
import { Link } from 'react-router-dom';


const Body = () => {

  // const navigate = useNavigate();
  let token = localStorage.getItem('usertoken');


  return (
    <div >
      {/* Banner */}
      <div className='banner relative w-full min-h-[500px] md:h-screen bg-white flex items-center justify-center overflow-hidden'>
        <img
          src={banner}
          alt='Banner'
          className='absolute inset-0 w-full h-full object-cover'
        />

        <div
          className='absolute inset-0 w-full h-full'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        ></div>

        <div className='relative z-10 max-w-6xl w-full flex flex-col md:flex-row items-center md:items-end justify-center md:justify-start px-4 py-12 md:py-0'>
          <div className='w-full md:w-1/2 lg:w-5/12'>
            <div className='card bg-black bg-opacity-40 backdrop-blur-sm border border-white border-opacity-20 shadow-xl'>
              <div className='card-body p-6 sm:p-8'>
                <h2 className='text-yellow-200 text-2xl md:text-3xl font-bold mb-4'>How Doctor Consultation Works?</h2>
                
                <div className='space-y-3 mb-6'>
                  <h2 className='text-lg md:text-xl text-white font-semibold flex items-start gap-3'>
                    <span className='bg-sky-500 rounded-full w-7 h-7 flex items-center justify-center text-sm shrink-0'>1</span>
                    Select the speciality
                  </h2>
                  <h2 className='text-lg md:text-xl text-white font-semibold flex items-start gap-3'>
                    <span className='bg-sky-500 rounded-full w-7 h-7 flex items-center justify-center text-sm shrink-0'>2</span>
                    Choose the doctor
                  </h2>
                  <h2 className='text-lg md:text-xl text-white font-semibold flex items-start gap-3'>
                    <span className='bg-sky-500 rounded-full w-7 h-7 flex items-center justify-center text-sm shrink-0'>3</span>
                    Book a slot
                  </h2>
                  <h2 className='text-lg md:text-xl text-white font-semibold flex items-start gap-3'>
                    <span className='bg-sky-500 rounded-full w-7 h-7 flex items-center justify-center text-sm shrink-0'>4</span>
                    Make payment
                  </h2>
                  <h2 className='text-lg md:text-xl text-white font-semibold flex items-start gap-3'>
                    <span className='bg-sky-500 rounded-full w-7 h-7 flex items-center justify-center text-sm shrink-0'>5</span>
                    Be present on HEALTH GOODY at the time of the consultation.
                  </h2>
                </div>

                {
                  token ? (
                    <Link to={'/doctorlist'}>
                      <button className="btn btn-primary w-full h-16 text-lg font-bold">
                        Book Consultation Now
                      </button>
                    </Link>
                  ) : (
                    <Link to={'/login'}>
                      <button className="btn btn-primary w-full h-16 text-lg font-bold">
                        Book Consultation Now
                      </button>
                    </Link>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className='bg-blue-50 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4'>
        <div className='max-w-7xl mx-auto flex flex-col items-center'>
          <div className='flex flex-wrap justify-center gap-8'>

            {/* Certified Doctors */}
            <div className='w-full sm:w-80 md:w-96 min-h-[16rem] h-auto duration-500 group overflow-hidden relative rounded-2xl bg-neutral-800 text-neutral-50 p-6 flex flex-col justify-between'>
              <div className='absolute blur duration-500 group-hover:blur-none w-72 h-72 rounded-full group-hover:translate-x-12 group-hover:translate-y-12 bg-sky-900 right-1 -bottom-24'></div>
              <div className='absolute blur duration-500 group-hover:blur-none w-12 h-12 rounded-full group-hover:translate-x-12 group-hover:translate-y-2 bg-indigo-700 right-12 bottom-12'></div>
              <div className='absolute blur duration-500 group-hover:blur-none w-36 h-36 rounded-full group-hover:translate-x-12 group-hover:-translate-y-12 bg-indigo-800 right-1 -top-12'></div>
              <div className='absolute blur duration-500 group-hover:blur-none w-24 h-24 bg-sky-700 rounded-full group-hover:-translate-x-12'></div>
              <div className='z-10 flex flex-col justify-evenly w-full h-full'>
                <span className='text-2xl font-bold'>Certified Doctors</span>
                <p>We offer quality healthcare through our network of certified and experienced doctors.</p>
                <div className='flex justify-center'>
                  <img className='w-24 h-24' src='certified.svg' alt='' />
                </div>
              </div>
            </div>

            {/* 100% Confidential */}
            <div className='w-full sm:w-80 md:w-96 min-h-[16rem] h-auto duration-500 group rounded-2xl overflow-hidden relative bg-neutral-800 text-neutral-50 p-6 flex flex-col justify-between'>
              <div className='absolute blur duration-500 group-hover:blur-none w-72 h-72 rounded-full group-hover:translate-x-12 group-hover:translate-y-12 bg-sky-900 right-1 -bottom-24'></div>
              <div className='absolute blur duration-500 group-hover:blur-none w-12 h-12 rounded-full group-hover:translate-x-12 group-hover:translate-y-2 bg-indigo-700 right-12 bottom-12'></div>
              <div className='absolute blur duration-500 group-hover:blur-none w-36 h-36 rounded-full group-hover:translate-x-12 group-hover:-translate-y-12 bg-indigo-800 right-1 -top-12'></div>
              <div className='absolute blur duration-500 group-hover:blur-none w-24 h-24 bg-sky-700 rounded-full group-hover:-translate-x-12'></div>
              <div className='z-10 flex flex-col justify-evenly w-full h-full'>
                <span className='text-2xl font-bold'>100% Confidential</span>
                <p>All advice & consultations are completely confidential. You can also delete chats whenever you want.</p>
                <div className='flex justify-center'>
                  <img className='w-24 h-24' src='confidential.svg' alt='' />
                </div>
              </div>
            </div>

            {/* Convenience */}
            <div className='w-full sm:w-80 md:w-96 min-h-[16rem] h-auto duration-500 group overflow-hidden relative rounded-2xl bg-neutral-800 text-neutral-50 p-6 flex flex-col justify-between'>
              <div className='absolute blur duration-500 group-hover:blur-none w-72 h-72 rounded-full group-hover:translate-x-12 group-hover:translate-y-12 bg-sky-900 right-1 -bottom-24'></div>
              <div className='absolute blur duration-500 group-hover:blur-none w-12 h-12 rounded-full group-hover:translate-x-12 group-hover:translate-y-2 bg-indigo-700 right-12 bottom-12'></div>
              <div className='absolute blur duration-500 group-hover:blur-none w-36 h-36 rounded-full group-hover:translate-x-12 group-hover:-translate-y-12 bg-indigo-800 right-1 -top-12'></div>
              <div className='absolute blur duration-500 group-hover:blur-none w-24 h-24 bg-sky-700 rounded-full group-hover:-translate-x-12'></div>
              <div className='z-10 flex flex-col justify-evenly w-full h-full'>
                <span className='text-2xl font-bold'>Convenience</span>
                <p>Forget the hassle of long queues and rush hour. Seek expert opinion anytime, anywhere.</p>
                <div className='flex justify-center'>
                  <img className='w-24 h-24' src='convenience.svg' alt='' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Speciality />



      {/* to Doctors side*/}
      {
        token ? (
          <div>

          </div>
        ) : (
          <div className='bg-yellow-50 min-h-[20rem] flex flex-col items-center justify-center text-center p-8 shadow-lg'>
            <h1 className='text-3xl font-bold text-green-500 mb-4'>Are you a Doctor?</h1>
            <p className='text-lg text-black mb-6'>Join our panel of specialists and connect with your patients from anywhere.</p>
            <Link to='/doctor/doctorside'>
              <button className="cursor-pointer relative group overflow-hidden my-4 border-2 px-8 py-2 border-green-500">
                <span className="font-bold text-white text-xl relative z-10 group-hover:text-green-500 duration-500 uppercase">JOIN NOW</span>
                <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:-translate-x-full h-full"></span>
                <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:translate-x-full h-full"></span>
                <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 delay-300 group-hover:-translate-y-full h-full"></span>
                <span className="absolute delay-300 top-0 left-0 w-full bg-green-500 duration-500 group-hover:translate-y-full h-full"></span>
              </button>
            </Link>
          </div>
        )
      }



    </div >
  );
};

export default Body;
