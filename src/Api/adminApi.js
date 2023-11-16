import { adminAxiosInstance } from "./axiosInstance";

export async function adminLogin(signupData){
    const data = await adminAxiosInstance.post("/adminLogin",signupData)
    return data
}

//user

export async function userList(){
    const data = await adminAxiosInstance.get("/userList")
    console.log(data,'ppipppppppppiiiiiiiiiiiiiiiipppppppppppppppppppppppppiiiiiiiii')
    return data
}

export async function userDetails(id){
    const data = await adminAxiosInstance.post("/userDetails",{id})
    return data
}

export async function userBlockUnblock(id){
    console.log(id)
    const data = await adminAxiosInstance.post("/blockUnblock",{id})
    return data
}

//doctor 

export async function doctorList(id){
    const data = await adminAxiosInstance.get("/doctorList")
    return data
}

export async function doctorDetails(id){
    console.log(id,"lllllllllllllllllllllllllllllllll")
    const data = await adminAxiosInstance.post("/doctorDetails",{id})
    console.log(data,'mymymy')
    return data
}

export async function unVerifiedList(){
    const data = await adminAxiosInstance.get("/unVerifiedList")
    return data
}


export async function doctorBlockUnblock(id){
    const data = await adminAxiosInstance.patch("/doctorblockUnblock",{id})
    return data 
}


