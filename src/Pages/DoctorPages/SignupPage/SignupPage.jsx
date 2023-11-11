import React, { useState } from 'react'
import doctorsignup from "../../../Assets/image/doctorsignup.jpg"
import { useFormik } from 'formik'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { doctorSchema } from '../../../validations/doctor/signupValidation'
import doctorSignup from "../../../Api/doctorApi"



const LoginPage = () => {
    const navigate = useNavigate()
    const [photo, setPhoto] = useState(null);
    const [certificates, setCertificates] = useState([]);


    const onSubmit = async () => {
        try {
            const response = await doctorSignup({ ...values, photo, certificates })

        } catch (error) {
            console.log(error.messsage)
        }
    }

    const handlePhotoChange = (e) => {
        const selectedPhoto = e.target.files[0];
        setPhotoToBase(selectedPhoto);
    };
    //  read the contents of the selected image and certificates files as data URLs 
    const setPhotoToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPhoto(reader.result);
        };
    };

    const handleCertificatesChange = (e) => {
        const selectedCertificates = e.target.files;
        setCertificatesToBase(selectedCertificates);
    };

    const setCertificatesToBase = async (files) => {
        const certificatesArray = [];

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onloadend = () => {
                certificatesArray.push(reader.result);
                setCertificates([...certificatesArray]);
            };
        }
    };

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            mobile: "",
            email: "",
            password1: "",
            password2: "",

        },
        validationSchema: doctorSchema,
        onSubmit

    })

    console.log(values, "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
    console.log(photo, "iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    console.log(certificates, "ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo")

    return (
        <>
            <div className="hero min-h-screen bg-base-200" style={{ backgroundImage: `url(${doctorsignup})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Signup now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="name"
                                    className="input input-bordered"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Number</span>
                                </label>
                                <input
                                    name="mobile"
                                    type="text"
                                    placeholder="mobile"
                                    className="input input-bordered"
                                    value={values.mobile}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    name="password1"
                                    type="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    value={values.password1}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password agaim </span>
                                </label>
                                <input
                                    name="password2"
                                    type="password" placeholder=" password again"
                                    className="input input-bordered"
                                    value={values.password2}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Upload your photo </span>
                                </label>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                                    onChange={handlePhotoChange}
                                    accept="image/*" // Allow only image files
                                    required
                                />
                            </div>
                            {/* <p>Selected Photo: {photo ? photo.name : 'None'}</p> */}
                            <div>
                                <label className="label">
                                    <span className="label-text">Upload your certificates </span>
                                </label>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered file-input-info w-full max-w-xs"
                                    onChange={handleCertificatesChange}
                                    // accept=".pdf,.doc,.docx"
                                    multiple
                                    required
                                />
                            </div>
                            <div>
                                {/* 
                                <p>Selected Certificates:</p>
                                <ul>
                                    {certificates.length > 0 &&
                                        Array.from(certificates).map((file, index) => (
                                            <li key={index}>{file.name}</li>
                                        ))}
                                </ul>
                                 */}
                            </div>

                            <div className="form-control mt-6">
                                {/* <button className="btn btn-primary">Login</button> */}
                                <button type='submit' className="btn btn-outline btn-accent" >sign up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LoginPage