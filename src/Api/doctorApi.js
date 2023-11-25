import { doctorAxiosInstance } from './axiosInstance';

export async function doctorSignup (signupData) {
  const data = await doctorAxiosInstance.post('/doctorSignup', signupData);
  return data;
}

export async function otpVerify (otp, otpId, doctorId) {
  const data = await doctorAxiosInstance.post('/doctorOtpVerify', { otp, otpId, doctorId });
  return data;
}

export async function otpResend (doctorId) {
  const data = await doctorAxiosInstance.post('/doctorResendOtp', { doctorId });
  return data;

}

export async function doctorLogin (loginData) {
    const data = await doctorAxiosInstance.post('/doctorLogin', loginData);
    return data;
}

