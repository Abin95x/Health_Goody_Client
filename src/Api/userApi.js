import { userAxiosInstance } from './axiosInstance';

export async function userSignup(signupData) {
    const data = await userAxiosInstance.post('/userSignup', signupData);
    return data;
}

export async function otpVerify(otp, otpId, userId) {
    const data = await userAxiosInstance.post('/otpVerify', { otp, otpId, userId });
    return data;
}

export async function otpResend(userId) {

    const data = await userAxiosInstance.post('/resendOtp', { userId });
    return data;
}

export async function userLogin(loginData) {

    const data = await userAxiosInstance.post('/userLogin', loginData);
    return data;
}
export async function getUserDetails(id) {
    const data = await userAxiosInstance.get(`/profileData/${id}`);
    return data;
}

export async function setDetails(values) {
    const data = await userAxiosInstance.post('/setDetails', values);
    return data;
}

export async function doctorList() {
    const data = await userAxiosInstance.get('/doctorList');
    return data;
}
export async function doctorDetails(id) {
    const data = await userAxiosInstance.get(`/doctorDetails/${id}`);
    return data;
}

export async function userSpecialityList() {
    const data = await userAxiosInstance.get('/specialityList');
    return data;
}

export async function slotList(drId, date) {
    const data = await userAxiosInstance.get(`/slotList?id=${drId}&date=${date}`);
    return data;
}

export async function makePayment(values) {
    const data = await userAxiosInstance.post('/makePayment', values);
    return data;
}

export async function makeAppointment(values) {
    console.log(values, 'apiiii appopopopo');
    const data = await userAxiosInstance.post('/makeAppointment', values);
    return data;
}

export async function appointmentList(id) {
    console.log(id, 'apaaiiiiiiiiiid');
    const data = await userAxiosInstance.get(`/appointmentList?id=${id}`);
    return data;
}