import { adminAxiosInstance } from './axiosInstance';

export async function adminLogin (signupData){
  const data = await adminAxiosInstance.post('/adminLogin',signupData);
  return data;
}

//user

export async function userList (){
  const data = await adminAxiosInstance.get('/userList');
  return data;
}

export async function userDetails (id){
  const data = await adminAxiosInstance.post('/userDetails',{id});
  return data;
}

export async function userBlockUnblock (id){
  const data = await adminAxiosInstance.post('/blockUnblock',{id});
  return data;
}

//doctor 

export async function doctorList (){
  const data = await adminAxiosInstance.get('/doctorList');
  return data;
}

export async function doctorDetails (id){
  const data = await adminAxiosInstance.post('/doctorDetails',{id});
  return data;
}

export async function doctorBlockUnblock (id){
  const data = await adminAxiosInstance.patch('/doctorblockUnblock',{id});
  return data; 
}

export async function unVerifiedList (){
  const data = await adminAxiosInstance.get('/unVerifiedList');
  return data;
}

export async function unVerifiedDetails (id) {
  const data = await adminAxiosInstance.get(`/unVerifiedDetails?id=${id}`);
  return data;
}

export async function adminVerify (id){ 
  const data = await adminAxiosInstance.patch(`/adminVerify?id=${id}`);
  return data;
}





