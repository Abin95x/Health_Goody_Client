import React, { useEffect, useState } from 'react';
import SideNav from '../../../Components/AdminComponents/SideNav/SideNav';
import Header from '../../../Components/AdminComponents/Header/Header';
import Footer from '../../../Components/AdminComponents/Footer/Footer';
import { counts } from '../../../Api/adminApi';


const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    counts().then((response) => {
      console.log(response.data);
      setData(response.data);
    }).catch((error) => {
      console.log(error.message);
    });

  }, []);
  return (
    <>
      <Header />
      <div className='flex'>
        <SideNav />
        {data && <div className='flex flex-col w-3/4'>
          <div className='flex flex-row justify-center'>
            <div className='w-64 h-20 m-10 rounded-md bg-gradient-to-r from-blue-500 to-green-500 text-white text-center text-2xl'>
              Doctors Count:
              <div>
                {data.doctor}
              </div>

            </div>

            <div className='w-64 h-20 m-10 rounded-md bg-gradient-to-r from-blue-500 to-green-500 text-white text-center text-2xl'>
              Users Count:
              <div>
                {data.user}
              </div>
            </div>

            <div className='w-64 h-20 m-10 rounded-md bg-gradient-to-r from-blue-500 to-green-500 text-white text-center text-2xl'>
              Admin Revenue:
              <div>
                {data.thirtyPercent}
              </div>
            </div>
            <div className='w-64 h-20 m-10 rounded-md bg-gradient-to-r from-blue-500 to-green-500 text-white text-center text-2xl'>
              Total Revenue:
              <div>
                {data.total}
              </div>
            </div>
          </div>

        </div>
        }
      </div >
      <Footer />
    </>
  );
};

export default Dashboard;
