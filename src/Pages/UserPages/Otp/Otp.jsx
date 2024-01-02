import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';
import { otpSchema } from '../../../validations/user/otpValidation';
import { otpVerify, otpResend } from '../../../Api/userApi';
import Swal from 'sweetalert2';

const Otp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, otpId } = location.state;

  const otpInputRefs = [useRef(), useRef(), useRef(), useRef()];

  const onSubmit = async () => {
    try {
      const combinedOTP = Object.values(values).join('');
      const response = await otpVerify(combinedOTP, otpId, userId);
      if (response?.data?.status) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          // timerProgressBar: true,
          // didOpen: (toast) => {
          //   toast.onmouseenter = Swal.stopTimer;
          //   toast.onmouseleave = Swal.resumeTimer;
          // },
        });

        Toast.fire({
          icon: 'info',
          title: 'Login now',
        });

        navigate('/login', { state: 'Email verified' });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          // timerProgressBar: true,
          // didOpen: (toast) => {
          //   toast.onmouseenter = Swal.stopTimer;
          //   toast.onmouseleave = Swal.resumeTimer;
          // },
        });

        Toast.fire({
          icon: 'error',
          title: 'Wrong OTP',
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const resendOtp = async () => {
    try {
      const response = await otpResend(userId);
      if (response.status === 200) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          // timerProgressBar: true,
          // didOpen: (toast) => {
          //   toast.onmouseenter = Swal.stopTimer;
          //   toast.onmouseleave = Swal.resumeTimer;
          // },
        });

        Toast.fire({
          icon: 'success',
          title: 'OTP resent',
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOtpChange = (index, e) => {
    handleChange(e);

    // Move focus to the next input field
    if (e.target.value !== '' && index < otpInputRefs.length - 1) {
      otpInputRefs[index + 1].current.focus();
    }
  };

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
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-teal-500 py-12">
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
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="w-16 h-16">
                        <input
                          ref={otpInputRefs[index]}
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name={`otp${index + 1}`}
                          value={values[`otp${index + 1}`]}
                          onChange={(e) => handleOtpChange(index, e)}
                          maxLength={1}
                        />
                        {errors[`otp${index + 1}`] && touched[`otp${index + 1}`] && (
                          <p className="text-red-600">{errors[`otp${index + 1}`]}</p>
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
                      <p>Didn&apos;t receive code?</p>{' '}
                      <a className="flex flex-row items-center text-blue-600" onClick={resendOtp}>
                        Resend
                      </a>
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
};

export default Otp;
