import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doctorDetails } from '../../../Api/userApi';

const DoctorDetails = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        doctorDetails(id)
            .then(response => {
                setDoctor(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    return (
        <div className="flex justify-center items-center min-h-screen  bg-white">
            {doctor ? (
                <div className="bg-white shadow-2xl text-slate-950 rounded-md p-8 w-[700px] flex">
                    <div className="flex-shrink-0">
                        <img
                            src={doctor.details.photo}
                            alt="Doctor's Photo"
                            className="w-24 h-24 object-cover rounded-full"
                        />
                    </div>
                    <div className="ml-4">
                        <h1 className="text-2xl font-bold mb-2">Dr. {doctor.details.name}</h1>
                        <hr />
                        <h1 className="mb-2 text-blue-500">
                            <span className="font-bold">Speciality:</span> {doctor.details.speciality || 'Not added'}
                        </h1>
                        <p className="mb-2">
                            <span className="font-bold">Language:</span> {doctor.details.language || 'Not added'}
                        </p>
                        <p className="mb-2">
                            <span className="font-bold">Experience:</span> {doctor.details.experience || 'Not added'}
                        </p>

                        <p className="mb-2">
                            <span className="font-bold">Rating:</span> {doctor.details.rating || 'Not added'}
                        </p>
                        <p className="mb-2">
                            <div className="h-52 w-96 bg-slate-400 shadow-2xl text-slate-950">
                                <span className="font-bold">Bio</span> 
                                <div className='text-center p-14'>
                                {doctor.details.bio || 'Not added'}
                                </div>
                            </div>
                        </p>
                        <div className='flex items-center justify-center'>
                            <button className="btn text-white btn-sm bg-blue-500">BOOK VIDEO CONSULT</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default DoctorDetails;
