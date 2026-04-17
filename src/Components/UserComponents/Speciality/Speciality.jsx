import React, { useEffect, useState } from 'react';
import { userSpecialityList } from '../../../Api/userApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';


const Speciality = () => {
    const [slist, setSlist] = useState(null);

    useEffect(() => {
        userSpecialityList()
            .then((res) => {
                setSlist(res?.data?.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);
    console.log(slist);

    const handleClick = async (id) => {
        try {

        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <div className='bg-blue-50 py-10'>
                <div className='text-center mb-8'>
                    <h1 className="text-3xl font-bold text-black underline">Specialities</h1>
                </div>
                <div className="bg-blue-50 flex items-center justify-center px-4">
                    <span className='hidden sm:block m-2 sm:m-5 text-sm'><FontAwesomeIcon icon={faArrowLeft} /></span>
                    <div className="w-full max-w-[1300px] flex flex-row border bg-white shadow-2xl rounded-xl overflow-x-auto">
                        <div className="flex flex-row p-4">
                            {slist && slist.map((speciality) => (
                                <div key={speciality._id} className="flex-shrink-0 cursor-pointer hover:scale-105 duration-300" onClick={() => handleClick(speciality._id)}>
                                    <div className="w-32 sm:w-48 mx-auto p-2 sm:p-4 bg-white flex flex-col items-center space-y-2 sm:space-y-4 text-center">
                                        <div className='w-full'>
                                            <img className="w-full h-16 sm:h-32 object-cover rounded-lg mb-2" src={speciality.photo} alt={speciality.speciality} />
                                            <p className="text-sm sm:text-base text-black font-semibold truncate px-2">{speciality.speciality}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <span className='hidden sm:block m-2 sm:m-5 text-sm'><FontAwesomeIcon icon={faArrowRight} /></span>
                </div>
            </div>
        </>


    );
};

export default Speciality;
