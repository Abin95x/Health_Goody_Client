import React from 'react'
import Header from '../../../Components/UserComponents/Header/Header'
import Footer from '../../../Components/UserComponents/Footer/Footer'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import Swal from 'sweetalert2'

import { loginSchema } from '../../../validations/user/loginValidation';
import { userLogin } from "../../../Api/userApi"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from "../../../Redux/UserSlice/UserSlice.js"



const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const response = await userLogin(values);

      localStorage.setItem("usertoken", response.data.usertoken);
    
      if (response?.status === 200) {
        const userData = response.data.userData;
        dispatch(
          setUser({
            user: userData,
          })
        );
  
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
  
        navigate("/");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      
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
        title: errorMessage,
      });
  
      console.error(error, "response in error");
    }
  }
  

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
      <Header />
      <div>
        <div className="hero min-h-screen bg-teal-700">
          <div className="hero-content flex-col lg:flex-col">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
            </div>
            <div className="card flex-shrink-0 w-full max-w-5xl shadow-2xl bg-base-100">
              <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name='email'
                    placeholder="email"
                    className="input input-bordered w-96"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-600">{errors.email}</p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name='password'
                    placeholder="password"
                    className="input input-bordered w-96"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-600">{errors.password}</p>
                  )}
                  <label className="label">
                    <Link to={"/forgotpassword"} className="label-text-alt link link-hover">Forgot password?</Link>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
                <div>
                  <br />
                  New user?{" "}
                  <Link to={"/signup"} className="font-medium text-orange-900">Sign Up</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default LoginPage