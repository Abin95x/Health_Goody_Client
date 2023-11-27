import { doctorAxiosInstance } from './axiosInstance';

export async function doctorSignup (signupData) {
  console.log(signupData,"muttteeeeee")
  const data = await doctorAxiosInstance.post('/doctorSignup', signupData);
  console.log(data,"kuaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

export async function specialityName(){
  console.log('api loggeddddddddssssssdddddsd')
  const data = await doctorAxiosInstance.get("/specialityName")
  return data
}