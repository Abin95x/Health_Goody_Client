

import React, { Children, useEffect, useState } from 'react';
import { unVerifiedDetails, adminVerify } from '../../../Api/adminApi';
import { useParams } from 'react-router-dom';

const VerifiedDetails = () => {
  const [doctorData, setDoctorData] = useState(null)
  const { id } = useParams()
  

  useEffect(() => {
    unVerifiedDetails(id)
      .then((res) => {
        setDoctorData(res?.data?.details)
      })
      .catch((error) => {
        console.log(error.message)
      })

  }, [id])
 


  const handleClick = async (id) => {
    try {
      console.log("first")
      await adminVerify(id);
      console.log("second")
      const res = await unVerifiedDetails(id);
      console.log(res,'ressssssssss')

      setDoctorData(res?.data?.details);

    } catch (error) {
      console.log(error.message)
    }
  }
  console.log(doctorData,"22222222")

  return (
    <>
      {doctorData && (
        <div className="card w-[400px] bg-black shadow-xl mx-10 mt-9 rounded-xl flex flex-col items-center"> {/* Updated styles here */}
          <figure className="px-10 pt-10">
            <img src={doctorData.photo} alt={doctorData.name} className="rounded-xl" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold mb-4">Dr. {doctorData.name}</h2>
            <p className="text-gray-300">Email: {doctorData.email}</p>
            <p className="text-gray-300">Mobile: {doctorData.mobile}</p>
            <p className="text-gray-300">Speciality: {doctorData.speciality}</p>
            <p className="text-gray-300">OTP Verified: {doctorData.otp_verified ? 'Yes' : 'No'}</p>
            <p className="text-gray-300">Blocked: {doctorData.is_blocked ? 'Yes' : 'No'}</p>
          </div>
          <div className="card-actions">


            <button className="btn btn-active btn-secondary" onClick={() => document.getElementById('my_modal_4').showModal()}>Click Here to View Certificates</button>


          </div>

          <br />
        </div>
      )}

      {
        doctorData && (


          <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-5xl bg-zinc-950 rounded-none">
              <h3 className="font-bold text-lg">CERTIFICATES</h3>
              <p className="py-4">Verify the certificate</p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  <br />

                  <div className=''>
                    {doctorData.certificates.map((certificate, index) => (
                      <div key={index}>
                        <img src={certificate} alt={`Certificate ${index + 1}`} className="rounded-xl" />
                        <br />
                      </div>

                    ))}
                    <br />


                  </div>

                  <button className="btn">Close</button>
                  {/* <button
                      className={`btn btn-${doctorData.is_blocked ? 'success' : 'success'}`}
                      onClick={() => handleClick(doctorData._id)}
                      style={{ backgroundColor: doctorData.is_blocked ? 'green' : 'red' }}
                    >
                      {doctorData.is_blocked ? 'UNBLOCK' : 'BLOCK'}
                    </button> */}
                  <button className="btn btn-success" onClick={() => handleClick(doctorData._id)}>
                    Verify
                  </button>

                </form>
              </div>
            </div>
          </dialog>


        )
      }



    </>

  );
};

export default VerifiedDetails;
