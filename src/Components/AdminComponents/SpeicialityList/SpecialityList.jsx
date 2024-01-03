import React, { useEffect, useState } from 'react';
import { addSpeciality, specialityList, listUnlist, editSpeciality } from '../../../Api/adminApi';
import Swal from 'sweetalert2';

const SpecialityList = () => {
    const [speciality, setSpeciality] = useState('');
    const [edit, setEdit] = useState('');
    const [photo, setPhoto] = useState(null);
    const [slist, setSlist] = useState([]);
    const [rerender, setRerender] = useState(false);
    const [data, setData] = useState(null);
    const [pagination, setPagination] = useState({});
    const [search, setSearch] = useState();
    const [filteredSpeciality, setFilteredSpeciality] = useState();
    const [loading, setLoading] = useState(false);



    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5;

    const handleClick = async () => {
        setLoading(true);

        const response = await addSpeciality({ speciality, photo });

        setLoading(false);

        if (response) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
                // timerProgressBar: true,
                // didOpen: (toast) => {
                //     toast.onmouseenter = Swal.stopTimer;
                //     toast.onmouseleave = Swal.resumeTimer;
                // },
            });
            setRerender(!rerender);
            Toast.fire({
                icon: 'success',
                title: response.data.message,
            });
        }
    };

    const handlePhoto = (e) => {
        const selectedPhoto = e.target.files[0];
        setPhotoToBase(selectedPhoto);
    };

    const setPhotoToBase = (img) => {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onloadend = () => {
            setPhoto(reader.result);
        };
    };

    const handleModal = (speciality) => {
        try {
            setData(speciality);
            setEdit(speciality.speciality);

            document.getElementById('my_modal');
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = async (id) => {
        try {

            const response = await editSpeciality({ id, edit, photo });
            if (response) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000,
                    // timerProgressBar: true,
                    // didOpen: (toast) => {
                    //     toast.onmouseenter = Swal.stopTimer;
                    //     toast.onmouseleave = Swal.resumeTimer;
                    // },
                });
                setRerender(!rerender);
                Toast.fire({
                    icon: 'success',
                    title: response.data.message,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };


    const handleList = async (id) => {
        try {
            const response = await listUnlist(id);
            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
            });
            setRerender(!rerender);
            Toast.fire({
                icon: 'success',
                title: response.data.message,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        specialityList(currentPage, limit, search)
            .then((response) => {
                console.log(response);
                setSlist(response.data.data);
                setPagination(response.data.pagination);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [rerender, currentPage, limit, search]);

    useEffect(() => {
        if (data) {
            document.getElementById('my_modal').showModal();
        }
    }, [data]);



    const handleChange = (e) => {
        try {
            setSearch(e.target.value);
            setCurrentPage(1);

        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        const filtered = slist.filter(
            (speciality) =>
                speciality.speciality.toLowerCase().includes(search?.toLowerCase() || '')
        );
        setFilteredSpeciality(filtered);
    }, [search, slist]);



    return (
        <>
            <div>
                <div className='overflow-x-auto '>
                    <br />
                    <div className='flex justify-between'>
                        <div >
                            <button className='btn btn-success mx-5 ' onClick={() => document.getElementById('my_modal_1').showModal()}>Add Speciality</button>
                        </div>
                        <div className=' pr-6 '>
                            <input
                                type='text'
                                placeholder='search'
                                value={search}
                                onChange={handleChange}
                                className='rounded-lg'
                            />
                        </div>

                    </div>

                    <br />
                    <table className='table'>
                        {/* head */}
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Speciality</th>
                                <th className='px-12'>Image</th>
                                <th>Listed/Not</th>
                                <th>Manage</th>
                                <th>List/Unlist</th>

                            </tr>
                        </thead>

                        <tbody>
                            {filteredSpeciality &&
                                filteredSpeciality.map((specialityItem, index) => (
                                    <tr key={specialityItem._id}>
                                        <th>{index + 1}</th>
                                        <td>{specialityItem.speciality}</td>
                                        <td>
                                            <img
                                                src={specialityItem.photo}
                                                alt={specialityItem.speciality}
                                                style={{ maxWidth: '100px', maxHeight: '100px' }}
                                            />
                                        </td>
                                        <td>{specialityItem.list ? 'Yes' : 'No'}</td>

                                        <td>
                                            <button className='btn' onClick={() => handleModal(specialityItem)}>Edit</button>
                                        </td>
                                        <td>
                                            {specialityItem.list ? (
                                                <button onClick={() => handleList(specialityItem._id)} className='btn btn-error'>
                                                    Unlist
                                                </button>
                                            ) : (
                                                <button onClick={() => handleList(specialityItem._id)} className='btn btn-success'>
                                                    List
                                                </button>
                                            )}
                                        </td>

                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <br />
                <br />
                {pagination && pagination.totalPages && (
                    <div className="flex justify-center mt-4 bg-base-100">
                        {Array.from({ length: pagination.totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`pagination-btn border w-10 ${index + 1 === currentPage ? 'border-green-500' : 'border-black'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>


            <dialog id='my_modal_1' className='modal'>
                <div className='modal-box'>
                    <h3 className='font-bold text-lg'>Add Speciality</h3>
                    <br />

                    <form method='dialog'>
                        <input
                            onChange={(e) => setSpeciality(e.target.value)}
                            value={speciality}
                            type='text'
                            placeholder='Type here'
                            className='input input-bordered input-primary w-full '
                        />

                        <br />
                        <br />

                        <input
                            accept='image/*'
                            onChange={handlePhoto}
                            type='file'
                            className='file-input file-input-bordered file-input-primary w-full max-w-xs'
                        />

                        <br />
                        <br />
                        <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
                        <button onClick={handleClick} className='btn btn-success'>ADD</button>

                        <br />
                        <br />
                        {loading && <span className='loading loading-dots loading-lg'></span>}

                    </form>

                </div>
            </dialog>

            {data && (
                <dialog id='my_modal' className='modal'>
                    <div className='modal-box'>
                        <h1>Edit Speciality</h1>
                        <form method='dialog'>
                            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
                            <br />

                            <input
                                onChange={(e) => setEdit(e.target.value)}
                                value={edit}
                                type='text'
                                placeholder='Type here'
                                className='input input-bordered input-primary w-full'
                            />

                            <br />
                            <br />

                            <input
                                accept='image/*'
                                onChange={handlePhoto}
                                type='file'
                                className='file-input file-input-bordered file-input-primary w-full max-w-xs'
                            />

                            <br />
                            <br />

                            <button onClick={() => handleEdit(data._id)} className='btn btn-warning'>
                                Done
                            </button>


                            <br />
                            <br />
                        </form>
                    </div>
                </dialog>
            )}
        </>
    );
};

export default SpecialityList;