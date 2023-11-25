import React, { useEffect, useState } from 'react'
import { addSpeciality } from '../../../Api/adminApi'
import Swal from 'sweetalert2';
import { specialityList } from '../../../Api/adminApi';



const SpecialityList = () => {
    const [speciality, setSpeciality] = useState()
    const [photo, setPhoto] = useState(null)
    const [slist, setSlist] = useState()

    const handleClick = async (e) => {

        const response = await addSpeciality({ speciality, photo })
        if (response) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });
            Toast.fire({
                icon: 'success',
                title: response.data.message,

            });

        }

    }
    const handlePhoto = (e) => {
        const selectedPhoto = e.target.files[0]
        setPhotoToBase(selectedPhoto)

    }

    const setPhotoToBase = (img) => {
        const reader = new FileReader()
        reader.readAsDataURL(img)
        reader.onloadend = () => {
            setPhoto(reader.result)
        }
    }

    // useEffect(() => {
    //     specialityList().then((response) => {
    //         setSlist(response)

    //     }).catch((error) => {
    //         console.log(error.message)
    //     })

    // })

    console.log(slist)
    return (
        <>
            <div>
                <div className="overflow-x-auto">
                    <br />
                    <div >
                        <button className="btn btn-success mx-5 " onClick={() => document.getElementById('my_modal_3').showModal()}>Add Speciality</button>
                    </div>
                    <br />
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Speciality</th>
                                <th>List</th>
                                <th>Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <th>1</th>
                                <td>Cy Ganderton</td>
                                <td>Quality Control Specialist</td>
                                <td>Blue</td>
                            </tr>

                        </tbody>
                    </table>
                </div>

            </div>


            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Speciality</h3>
                    <br />
                    <form method="dialog">
                        <input onChange={(e) => setSpeciality(e.target.value)} value={speciality} type="text" placeholder="Type here" className="input input-bordered input-primary w-full " />
                        <br />
                        <br />
                        <input accept='image/*' onChange={handlePhoto} type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                        <br />
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        <br />
                    </form>

                    <button onClick={handleClick} className="btn btn-success">ADD</button>


                </div>
            </dialog>
        </>
    )
}

export default SpecialityList