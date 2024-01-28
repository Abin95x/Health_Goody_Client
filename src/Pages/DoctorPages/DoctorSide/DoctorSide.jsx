import React from 'react';
import doctorsignup from '../../../Assets/image/doctorsignup.jpg';
import { Link } from 'react-router-dom';

const DoctorSide = () => {
  return (
    <div className='hero min-h-screen' style={{ backgroundImage: `url(${doctorsignup})` }}>
      <div className='hero-overlay bg-opacity-60'></div>
      <div className='hero-content text-center text-neutral-content'>
        <div className='max-w-md'>
          <h1 className='mb-5 text-5xl font-bold'>Hello Doctor</h1>
          <p className='mb-5'>
            Welcome, doctors! Your dedication to healthcare is commendable. Join our community to connect with peers, access resources, and enhance your medical journey. Already a member? Log in or sign up to make a positive impact on people's lives.
          </p>
          <Link to='/doctor/login' className=''><button
  className="relative py-2 px-8class w-40 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
>
  Login
</button>
</Link>
          <br />
          <br />
          <Link to='/doctor/signup' className='' ><button
  className="relative w-40 py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
>
  Signup
</button>
</Link>
          <br />
          <br />
          <Link to='/' className='' ><button
  className="relative  w-40 py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
>
  Home
</button>
</Link>

          <div>
            <br />
            <h1></h1>
          </div>

        </div>

      </div>

    </div>
  );
};

export default DoctorSide;