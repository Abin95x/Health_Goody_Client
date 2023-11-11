import axios from "axios"


const userApi = axios.create({
    baseURL: `http://localhost:3001`,
    headers:{
        Authorization:token
      }

})

export async function userSignup(signupData) {
    try {
        const data = await userApi.post("/userSignup", signupData)
        return data
    } catch (error) {
        console.log(error.message)
    }
}

export async function otpVerify(otp, otpId, userId) {
    try {
        const data = await userApi.post("/otpVerify", { otp, otpId, userId })
        return data

    } catch (error) {
        console.log(error.message)
    }
}

export async function otpResend(userId) {
    try {
        const data = await userApi.post("/resendOtp", { userId })
        return data

    } catch (error) {
        console.log(error.message);
    }
}

export async function userLogin(loginData) {
    try {
        const data = await userApi.post("/userLogin", loginData)
        return data

    } catch (error) {
        console.log(error.message)
    }
}