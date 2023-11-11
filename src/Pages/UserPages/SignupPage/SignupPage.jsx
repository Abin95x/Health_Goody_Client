// import React, { useState } from 'react'
import Header from '../../../Components/UserComponents/Header/Header'
import Footer from '../../../Components/UserComponents/Footer/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { userSignup } from '../../../Api/userApi'
import { useFormik } from "formik"
import { userSchema } from "../../../validations/user/signupValidation"
import Swal from 'sweetalert2'



const SignupPage = () => {

  const navigate = useNavigate()

  async function onSubmit() {
    try {
          
      const response = await userSignup(values)
      console.log(response,"my love");
      console.log(response.data.otpId);
      const {userData,otpId} = response.data
      if (response.data.status) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Enter the OTP",
          showConfirmButton: false,
          timer: 3000
        });
        navigate("/userotp",{
          state:{userId: userData._id, otpId: otpId} 
        })
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password1: "",
      password2: "",
      
    },
    validationSchema: userSchema,
    onSubmit
  })

  return (
    <div>
      <Header />

      <div className="hero min-h-screen  bg-teal-700">
        <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Register now!</h1>
            </div>
            <br />
            <form action="" onSubmit={handleSubmit} >
              <div>
                <input
                  name='name'
                  type="text"
                  placeholder="Type name"
                  className="input input-bordered w-96"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div>
                  {errors.name && touched.name && (
                    <p className="text-red-600">{errors.name}</p>
                  )}
                </div>
                <br />


                <input
                  name='mobile'
                  type="text"
                  placeholder="Type number"
                  className="input input-bordered w-96"
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div>
                  {errors.mobile && touched.mobile && (
                    <p className="text-red-600">{errors.mobile}</p>
                  )}
                </div>
                <br />


                <input
                  name='email'
                  type="email"
                  placeholder="Type email"
                  className="input input-bordered w-96"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />


                <div>
                  {errors.email && touched.email && (
                    <p className="text-red-600">{errors.email}</p>
                  )}
                </div>
                <br />

                <input
                  name='password1'
                  type="password1"
                  placeholder="Type password"
                  className="input input-bordered w-96"
                  value={values.password1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <div>
                  {errors.password1 && touched.password1 && (
                    <p className="text-red-600">{errors.password1}</p>
                  )}

                </div>
                <br />

                <input
                  name='password2'
                  type="password2"
                  placeholder="Retype password"
                  className="input input-bordered w-96"
                  value={values.password2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div>
                  {errors.password2 && touched.password2 && (
                    <p className="text-red-600">{errors.password2}</p>
                  )}
                </div>
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                  Signup
                </button>
              </div>
              <br />

              Already have an account?{" "}
              <Link to={"/login"} className="font-medium text-orange-900">
                Login
              </Link>
            </form>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SignupPage