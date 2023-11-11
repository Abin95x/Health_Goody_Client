import axios from "axios"

const doctorApi = axios.create({
    baseURL: `http://localhost:3001`,
    // headers:{
    //     Authorization:token
    //   }
})

export async function doctorSignup(signupData){
    try{
        const data = await doctorApi.post("/doctorSignup",signupData)
        return data

    }catch(error){
        console.log(error.message)
    }
}