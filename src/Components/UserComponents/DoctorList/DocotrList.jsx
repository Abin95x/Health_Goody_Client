import React, { useEffect, useState } from 'react';
import { doctorList } from '../../../Api/userApi';
import { Link } from 'react-router-dom';
import { specialityName } from '../../../Api/doctorApi';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [speciality, setSpeciality] = useState([]);
    const [select, setSelect] = useState('');
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [noOfDoctors, setNoOfDoctors] = useState(8);

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
        setCurrentPage(1);
    };

    const handleSelectChange = (e) => {
        setSelect(e.target.value);
        setCurrentPage(1);
    };

    useEffect(() => {
        specialityName()
            .then((res) => {
                setSpeciality(res.data.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    useEffect(() => {
        const filtered = doctors.filter(
            (doctor) =>
                doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (select ? doctor.speciality === select : true)
        );

        setFilteredDoctors(filtered);
    }, [doctors, searchQuery, select]);

    const lastItemIndex = currentPage * noOfDoctors;
    const firstItemIndex = lastItemIndex - noOfDoctors;
    const currentDoctors = filteredDoctors.slice(firstItemIndex, lastItemIndex);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className='bg-white min-h-screen'>
                <div className='flex justify-center space-x-4 p-4'>
                    {speciality && (
                        <div className='text-black'>
                            <select
                                name="speciality"
                                onChange={handleSelectChange}
                                className="input input-bordered bg-white border-black rounded-none"
                            >
                                <option value="" disabled selected>
                                    Select a speciality
                                </option>
                                {speciality.map((speciality) => (
                                    <option key={speciality.id} value={speciality.id}>
                                        {speciality.speciality}
                                    </option>
                                ))}
                            </select>

                        </div>
                    )}

                    <input
                        type='text'
                        placeholder='Search'
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className='input input-bordered w-full md:w-64 bg-white border-black text-black rounded-none'
                    />
                </div>

                <div className='max-w-screen-xl mx-auto p-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                        {currentDoctors.map((doctor) => (
                            <Link to={`/doctordetails/${doctor._id}`} key={doctor._id}>
                                <div className='bg-white shadow-lg border rounded-lg overflow-hidden transition-transform transform hover:scale-105'>
                                    <div className='p-4 text-gray-900'>
                                        <img
                                            src={doctor.photo}
                                            alt={doctor.name}
                                            className='w-24 h-24 rounded-full mb-4 mx-auto object-cover'
                                        />
                                        <h3 className='text-lg font-semibold text-center mb-2'>Dr. {doctor.name}</h3>
                                        {/* <p className='mb-2'>Education: {doctor.education ? doctor.education : 'Not added'}</p> */}
                                        <p className='mb-2'>Price: ₹299</p>
                                    </div>
                                    <div className='border-t p-4 text-black'>
                                        <p className='mb-2'>Speciality: {doctor.speciality}</p>
                                        <p className='mb-2'>Experience: {doctor.experience ? doctor.experience : 'Not added'}</p>
                                        <p className='mb-2'>
                                            Languages:{' '}
                                            {doctor.languages && doctor.languages.length > 0
                                                ? doctor.languages.join(', ')
                                                : 'Not added'}
                                        </p>
                                        <div className='flex items-center justify-center'>
                                            {/* <button className='btn text-white btn-sm bg-blue-500 hover:bg-blue-600'>
                BOOK VIDEO CONSULT
              </button> */}

                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Pagination */}
                <div className='flex justify-center mt-4 bg-white'>
                    {Array.from({ length: Math.ceil(filteredDoctors.length / noOfDoctors) }, (_, index) => (
                        <button key={index + 1} onClick={() => paginate(index + 1)} className='pagination-btn border w-10 border-black'>
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>

        </>
    );
};

export default DoctorList;
