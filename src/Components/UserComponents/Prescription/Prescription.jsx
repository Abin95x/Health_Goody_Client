import React from 'react'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, } from '@fortawesome/free-solid-svg-icons';


const Prescription = () => {
    const location = useLocation();
    const { _id, name } = useSelector((state) => state.reducer.userReducer.user);
    const navigate = useNavigate()
    const { data } = location.state || {}
    console.log(data._id);

    return (
        <>
            <div className='bg-blue-50 min-h-screen p-5'>
                <div className='flex justify-center'>
                    <div className='bg-white min-h-screen border border-gray-600  w-[900px]'>
                        <div className='bg-emerald-500 h-32 w-full mt-10'>
                            <h1 className='text-3xl text-white font-bold text-center p-10'>
                                HEALTH GOODY ONLINE  <FontAwesomeIcon icon={faStethoscope} />
                            </h1>
                        </div>
                        <br />
                        <div className='m-5 border'>
                            <hr />
                        </div>
                        <div className='m-5'>
                            DOCTOR DETAILS
                        </div>
                        <div className=''>

                            <div className='m-5'>
                                <h1>DR : Abin</h1>
                                <h1>speciality : dermatology</h1>
                                <h1>Mobile : 9988998899</h1>
                            </div>


                        </div>

                        <div className='m-5 border'>
                            <hr />
                        </div>

                        <div className='m-5'>
                            PATIENT DETAILS
                        </div>

                        <div className='m-5 border'>
                            <hr />
                        </div>

                        <div className='m-5'>
                            <h1>MEDICINE</h1>
                        </div>

                        <div className='m-5 border'>
                            <hr />
                        </div>


                    </div>

                </div>


            </div >
        </ >
    )
}

export default Prescription