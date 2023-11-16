import React from 'react';
import SideNav from '../../../Components/AdminComponents/SideNav/SideNav';
import Header from '../../../Components/AdminComponents/Header/Header';
import Footer from '../../../Components/AdminComponents/Footer/Footer';

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className='flex'>
        <SideNav />
        <div className='flex flex-col w-3/4'>
          <div className='bg-red-700 flex-grow'>
            <div className="hero min-h-screen bg-base-200">
              <div className="hero-content text-center">
                <div className="max-w-md">
                  <h1 className="text-5xl font-bold">Hello there</h1>
                  <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                  <button className="btn btn-primary">Get Started</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Dashboard;
