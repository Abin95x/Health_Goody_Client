import { userAxiosInstance } from "./axiosInstance"

export async function userSignup(signupData) {
  
    const data = await userAxiosInstance.post("/userSignup", signupData)
    return data
}

export async function otpVerify(otp, otpId, userId) {

    const data = await userAxiosInstance.post("/otpVerify", { otp, otpId, userId })
    return data
}

export async function otpResend(userId) {

    const data = await userAxiosInstance.post("/resendOtp", { userId })
    return data
}

export async function userLogin(loginData) {

    const data = await userAxiosInstance.post("/userLogin", loginData)
    return data
}
