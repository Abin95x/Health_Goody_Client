import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';
import { otpResend, otpVerify } from '../../../Api/doctorApi';
import { otpSchema } from '../../../validations/user/otpValidation';
import Swal from 'sweetalert2';

const DoctorOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctorId, otpId } = location.state;
  const inputRefs = useRef([]);

  const onSubmit = async () => {
    try {
      const combinedOTP = Object.values(values).join("");
      console.log(combinedOTP,"0000000000000000000000000000000000000000000")
      const response = await otpVerify(combinedOTP, otpId, doctorId)
      console.log(response,"qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
      if (response?.data?.status) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });

        Toast.fire({
          icon: 'info',
          title: 'Login now',
        });

        // Focus on the first input after successful verification
        inputRefs.current[0].focus();

        navigate("/doctor/login", { state: "Email verified" });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000,
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
      console.log(error.message)
    }
  }

  const resendOtp = async () => {
    try {
      const response = await otpResend(doctorId)
      if (response.status === 200) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });

        Toast.fire({
          icon: 'info',
          title: 'OTP resended',
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
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
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    {Object.keys(values).map((fieldName, index) => (
                      <div key={fieldName} className="w-16 h-16">
                        <input
                          ref={(input) => (inputRefs.current[index] = input)}
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name={fieldName}
                          value={values[fieldName]}
                          onChange={(e) => {
                            handleChange(e);
                            // Focus on the next input when a digit is entered
                            if (e.target.value.length === 1 && index < inputRefs.current.length - 1) {
                              inputRefs.current[index + 1].focus();
                            }
                          }}
                          maxLength={1}
                        />
                        {errors[fieldName] && touched[fieldName] && (
                          <p className="text-red-600">{errors[fieldName]}</p>
                        )}
                      </div>
                    ))}
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
  );
}

export default DoctorOtp;
