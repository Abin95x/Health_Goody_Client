import { adminAxiosInstance } from "./axiosInstance";

export async function adminLogin(signupData){
  
    const data = adminAxiosInstance.post("/adminLogin",signupData)
    return data
}