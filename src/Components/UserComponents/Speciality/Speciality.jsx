import React, { useEffect, useState } from 'react';
import { userSpecialityList } from '../../../Api/userApi';

const Speciality = () => {
    const [slist, setSlist] = useState(null);

    useEffect(() => {
        userSpecialityList()
            .then((res) => {
                setSlist(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    console.log(slist);
    const handleClick = async (id) => {
        try {
            console.log(id);

        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <div className='bg-blue-50'>
                <div className='text-center bg-blue-50'>
                    <h1 className="text-3xl font-bold text-black mb-4 ">Specialities</h1>
                </div>
                <div className="bg-blue-50 flex items-center justify-center h-96">
                    <div className="carousel  w-[1240px] flex flex-row border rounded-lg bg-white">
                        <div className="carousel rounded-box">
                            {slist && slist.map((speciality) => (
                                <div key={speciality._id} className="carousel-item cursor-pointer" onClick={() => handleClick(speciality._id)}>
                                    <div className="max-w-xs mx-auto p-4 bg-white flex flex-col items-center space-y-5 text-center">
                                        <div className='mx-10 '>
                                            <img className="w-full h-32 object-cover mb-4" src={speciality.photo} alt={speciality.speciality} />
                                            <p className="text-lg text-black font-semibold">{speciality.speciality}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                    <br />
                </div>

            </div>





        </>

    );
};

export default Speciality;
