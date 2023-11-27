import React, { useEffect, useState } from 'react';
import { doctorList } from '../../../Api/userApi';
import { Link } from 'react-router-dom';
import { specialityName } from '../../../Api/doctorApi'



const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [speciality, setSpeciality] = useState()

    useEffect(() => {
        doctorList()
            .then((response) => {
                setDoctors(response.data.doctors);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    useEffect(() => {
        specialityName().then((res) => {
            setSpeciality(res.data.data)
        }).catch((error) => {
            console.log(error.message)
        })

    }, [])


    return (
        <>
            <div className='bg-white min-h-screen '>
                <br />
                <div className='flex justify-center'>
                    
                    {
                        speciality && <div className='text-black'>
                            <select
                                name="speciality"
                                className="input input-bordered bg-white  border-black rounded-none"
                            >
                                <option value="" disabled>Select a speciality</option>
                                {speciality && speciality.map((speciality) => (
                                    <option key={speciality.id} value={speciality.speciality}>
                                        {speciality.speciality}
                                    </option>
                                ))}
                            </select>
                        </div>
                    }
                    
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="input input-bordered w-24 md:w-auto bg-white border-black text-black rounded-none"
                    />
                </div>
               



                <div className='bg-white h-screen flex flex-col justify-center items-center'>
                    <div className='flex flex-wrap justify-center'>
                        <br />
                        {filteredDoctors.map((doctor) => (
                            <Link to={`/doctordetails/${doctor._id}`} key={doctor._id}>
                                <div className='bg-white shadow-lg border w-80 rounded-lg overflow-hidden m-4 transition-transform transform hover:scale-105'>
                                    <div className='p-4 text-gray-900'>
                                        <img
                                            src={doctor.photo}
                                            alt={doctor.name}
                                            className='w-24 h-24 rounded-full mb-4 mx-auto'
                                        />
                                        <h3 className='text-lg font-semibold text-center mb-2'>Dr. {doctor.name}</h3>
                                        <p className='mb-2'>Education: {doctor.education ? doctor.education : 'Not added'}</p>
                                        <p className='mb-2'>Price: $299 </p>
                                    </div>
                                    <div className='border-t p-4 text-black'>
                                        <p className='mb-2'>Speciality: {doctor.speciality}</p>
                                        <p className='mb-2'>Experience: {doctor.experience ? doctor.experience : 'Not added'}</p>
                                        <p className='mb-2'>Languages: {doctor.languages ? doctor.languages : 'Not added'}</p>
                                        <div className='flex items-center justify-center'>
                                            <button className="btn text-white btn-sm bg-blue-500">BOOK VIDEO CONSULT</button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoctorList;
