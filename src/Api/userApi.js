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

export async function doctorList(select,search,page,count,sort) {
    console.log(select);
    console.log(search);
    console.log(page);
    console.log(count);
    console.log(sort);
    const data = await userAxiosInstance.get(`/doctorList?select=${select}&search=${search}&page=${page}&count=${count}&sort=${sort}`);
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

export async function appointmentList(id,page,limit) {
    console.log(id, 'apaaiiiiiiiiiid');
    const data = await userAxiosInstance.get(`/appointmentList?id=${id}`,{
        params:{
            page,
            limit,
        }
    });
    return data;
}

export async function cancelAppointment(id){
    console.log(id,'api');
    const data = await userAxiosInstance.patch(`cancelAppointment?id=${id}`);
    return data;
}