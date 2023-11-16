import React from 'react';
import { useLocation } from 'react-router-dom';
import { doctorBlockUnblock } from '../../../Api/adminApi';

const DoctorDetails = () => {
  const location = useLocation();
  const doctorData = location.state && location.state.doctorData;

  const handleClick=  async (id) =>{
    try{
      console.log(id)
      const data = doctorBlockUnblock(id)

    }catch(error){
      console.log(error.message)
    }
  }
  return (
    <>
      <div className="card w-[400px] bg-black shadow-xl mx-10 mt-9 rounded-xl">
        <figure className="px-10 pt-10">
          <img src={doctorData.photo} alt={doctorData.name} className="rounded-xl" />
        </figure>
        <div className="card-body  ">
          <h2 className="card-title text-3xl font-bold mb-4">Dr . {doctorData.name}</h2>
          <p className="text-gray-300">Email: {doctorData.email}</p>
          <p className="text-gray-300">Mobile: {doctorData.mobile}</p>
          <p className="text-gray-300">Speciality: {doctorData.speciality}</p>
          <p className="text-gray-300">OTP Verified: {doctorData.otp_verified ? 'Yes' : 'No'}</p>
          <p className="text-gray-300">Blocked: {doctorData.is_blocked ? 'Yes' : 'No'}</p>
        </div>
        <div className="card-actions mx-[147px]">
            <button   className="btn btn-primary" onClick={()=>handleClick(doctorData._id)} >APPROVE</button>
          </div>
          <br />
      </div>
    </>
  );
};

export default DoctorDetails;
