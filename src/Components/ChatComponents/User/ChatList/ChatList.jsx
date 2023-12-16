import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchDoctorDetails } from '../../../../Api/chatApi';

const ChatList = ({data,currentUserId}) => {
  
  const [doctorDetails,setDoctorDetails] = useState(null);
  useEffect(()=>{
    const doctorId = data?.members?.find((id) => id !== currentUserId);
    console.log(doctorId);
    const getDoctorData = async () => {
      try {
        const {data} = await fetchDoctorDetails(doctorId);
        console.log(data);
        setDoctorDetails(data);
        
      } catch (error) {
        console.log(error.message);
      }
    };
    getDoctorData();
  },[data,currentUserId]);


  return (
   <div>
    
      <div className='p-4 border-b'>
        
        {
          doctorDetails && (
            <div className='mt-4 flex items-center '>
            <div className='mr-4'>
              <img
                src={doctorDetails.photo}
                alt={`Photo of ${doctorDetails.name}`}
                className='w-20 h-20 rounded-full mb-4 mx-auto object-cover'
              />
            </div>
            <div>
              <p className='text-lg font-semibold'>{doctorDetails.name}</p>
            
            </div>
          </div>
          )
        }
         
        
      </div>
    
    </div>
  );
};

ChatList.propTypes = {
  chats: PropTypes.array.isRequired,
  onDoctorClick: PropTypes.array.isRequired,

};

export default ChatList;
