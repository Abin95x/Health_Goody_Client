import { doctorAxiosInstance } from './axiosInstance';

export async function doctorSignup(signupData) {
    const data = await doctorAxiosInstance.post('/doctorSignup', signupData);
    return data;
}

export async function otpVerify(otp, otpId, doctorId) {
    const data = await doctorAxiosInstance.post('/doctorOtpVerify', { otp, otpId, doctorId });
    return data;
}

export async function otpResend(doctorId) {
    const data = await doctorAxiosInstance.post('/doctorResendOtp', { doctorId });
    return data;
}

export async function doctorLogin(loginData) {
    const data = await doctorAxiosInstance.post('/doctorLogin', loginData);
    return data;
}

export async function doctorForgetPassword(email) {
    const data = await doctorAxiosInstance.get(`/forgotPass?email=${email}`)
    return data
}

export async function doctorResetPassword(id, token, password) {
    console.log(id, token, password);
    const data = await doctorAxiosInstance.patch(`/resetPassword?id=${id}&token=${token}&password=${password}`)
    return data
}

export async function specialityName() {
    const data = await doctorAxiosInstance.get('/specialityName');
    return data;
}

export async function slotDetails(slotData) {
    console.log(slotData, 'dsdsdsdsdsdsdsdapiiiiii');
    const data = await doctorAxiosInstance.post('/slotDetails', slotData);
    return data;
}

export async function slotList(id) {
    const data = await doctorAxiosInstance.get(`/slotList?id=${id}`);
    return data;
}

export async function doctorDetails(id) {
    const data = await doctorAxiosInstance.get(`/doctorDetails?id=${id}`);
    return data;
}


export async function editProfile(values,) {
    const data = await doctorAxiosInstance.post('/editProfile', values);
    return data;
}

export async function appointmentList(id, page, limit) {
    const data = await doctorAxiosInstance.get(`/appointmentList?id=${id}`, {
        params: {
            page,
            limit,
        }
    });
    return data;
}

export async function createChat(values) {
    const data = await doctorAxiosInstance.post('/createChat', values);
    return data;
}

export async function priscription(values) {
    const data = await doctorAxiosInstance.post('/priscription', values)
    return data
}

export async function markasDone(id) {
    console.log(id, 'hiiiiiiiiiiapi');
    const data = await doctorAxiosInstance.patch(`/markAsDone?id=${id}`)
    return data
}


