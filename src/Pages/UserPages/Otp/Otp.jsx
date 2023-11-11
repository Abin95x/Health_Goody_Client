import React from 'react'
import { useFormik } from 'formik';
import { useNavigate, useLocation } from "react-router-dom"
import { otpSchema } from '../../../validations/user/otpValidation';
import { otpVerify, otpResend } from '../../../Api/userApi'
// import { useRef } from 'react'
import Swal from 'sweetalert2'

const Otp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, otpId } = location.state;


  const onSubmit = async () => {
    try {
      const combinedOTP = Object.values(values).join("");
      const response = await otpVerify(combinedOTP, otpId, userId)
      if (response?.data?.status) {
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: "Login now",
          showConfirmButton: false,
          timer: 3000
        });

        navigate("/login", { state: "Email verified" });
      }
    } catch (error) {
      console.log(error.message)
    }
  }


  const resendOtp = async () => {
    try {
      const response = await otpResend(userId)
      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "OTP resended",
          showConfirmButton: true,
          timer: 5000
        });
        // setCountDown(30);
        // setShowResendButton(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
    },
    validationSchema: otpSchema,
    onSubmit,
  });


  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-teal-700 py-12">
        <div className="relative bg-base-100 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>OTP Verification</p>
              </div>
              {/* <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email ba**@dipainhouse.com</p>
              </div> */}
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <div className="w-16 h-16 ">
                      <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name="otp1"
                        value={values.otp1}
                        onChange={handleChange}
                        id=""
                        maxLength={1}
                      />
                      {errors.otp1 && touched.otp1 && (
                        <p className="text-red-600">{errors.otp1}</p>
                      )}
                    </div>

                    <div className="w-16 h-16 ">
                      <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name="otp2"
                        value={values.otp2}
                        onChange={handleChange}
                        id=""
                        maxLength={1}
                      />
                      {errors.otp2 && touched.otp2 && (
                        <p className="text-red-600">{errors.otp2}</p>
                      )}
                    </div>

                    <div className="w-16 h-16 ">
                      <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name="otp3"
                        value={values.otp3}
                        onChange={handleChange}
                        id=""
                        maxLength={1}
                      />
                      {errors.otp3 && touched.otp3 && (
                        <p className="text-red-600">{errors.otp3}</p>
                      )}
                    </div>

                    <div className="w-16 h-16 ">
                      <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name="otp4"
                        value={values.otp4}
                        onChange={handleChange}

                        id=""
                        maxLength={1}
                      />
                      {errors.otp4 && touched.otp4 && (
                        <p className="text-red-600">{errors.otp4}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-5">
                    <div>
                      <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                        Verify
                      </button>
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't receive code?</p> <a className="flex flex-row items-center text-blue-600" onClick={resendOtp} >Resend</a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Otp