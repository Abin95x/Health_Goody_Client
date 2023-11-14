import React from 'react'
import doctorsignup from "../../../Assets/image/doctorsignup.jpg"
import { useFormik } from 'formik'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSchema } from '../../../validations/doctor/loginValidation';
import { doctorLogin } from '../../../Api/doctorApi'
import { setDoctor } from '../../../Redux/DoctorSlice/DoctorSlice'


const SignupPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Ensure you are using the correct hook for your routing library
  
    const onSubmit = async (values) => {
        try {
            // Assuming `doctorLogin` is an asynchronous function that handles login
            const response = await doctorLogin(values);
            localStorage.setItem("doctortoken", response.data.doctortoken);

            console.log(response, "xxxxxxxxxxxxxxxxx");

            if (response.status === 200) {
                const doctorData = response.data.doctorData;
                console.log(doctorData);

                dispatch(setDoctor({ doctor: doctorData }));

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
                    title: 'Logged in successfully',
                });

                // Assuming you are using react-router for navigation
                navigate('/doctor/dashboard');
            } else {
                // Handle errors here
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
                    icon: 'error',
                    title: 'Error',
                });
            }
        } catch (error) {
            console.error(error.message);

            // Display a SweetAlert for the error case
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
                icon: 'error',
                title: 'An error occurred',
            });
        }
    };

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit
    });

    return (
        <>
        <div className="hero min-h-screen bg-base-200" style={{ backgroundImage: `url(${doctorsignup})` }}>
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content flex-col lg:flex-row-reverse items-center lg:items-start">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && <p className="text-red-600">{errors.email}</p>}
                </div>
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input input-bordered w-full"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && <p className="text-red-600">{errors.password}</p>}
                  <label className="label mt-2">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary w-full">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
      
    )
}

export default SignupPage