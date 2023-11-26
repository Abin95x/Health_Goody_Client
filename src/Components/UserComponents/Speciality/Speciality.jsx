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

    return (
        <>
            <div className='text-center bg-white'>
                <h1 className="text-3xl font-bold text-black mb-4">Specialities</h1>

                {slist &&(
                    <div className="carousel carousel-center rounded-box">
                        {slist.map((speciality) => (
                            <div key={speciality.id} className="carousel-item">
                                <img src={speciality.imageUrl} alt={speciality.name} />
                                <p>{speciality.name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Speciality;
