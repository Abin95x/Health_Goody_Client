import React, { useEffect } from 'react';
import { doctorData } from '../../../Api/chatApi';

const Chat = () => {
  useEffect(()=>{
    doctorData().then((res)=>{
      console.log(res); 
    }).catch((error)=>{
      console.log(error.message);
    });
  });

  return (
    <div className='min-h-screen bg-blue-50'>
      <br />
      <br />
        <div  className='min-h-screen bg-blue-50 flex justify-center'>
          
          <div className='w-96 h-[700px] bg-white rounded-2xl me-10'>
            <div className='bg-blue-500  h-20 rounded-t-2xl flex justify-center '>
              <h1 className='text-3xl p-5 text-slate-950'>Chats</h1>
            </div>
          </div>
          <div className='w-[1000px] h-[700px] bg-white rounded-2xl'>
          <div className='bg-blue-500 h-20 rounded-t-2xl flex justify-center '>
        
            </div>
          </div>

        </div>
    </div>
  );
};

export default Chat;