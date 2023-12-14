import axios from 'axios';
const baseURL = 'http://localhost:3001/';
const chatInstance = axios.create({baseURL:baseURL});

export async function userData(id){
    const data = await chatInstance.get(`/chat/userData/${id}`);
    return data;
}

export async function doctorData(id){
    const data = await chatInstance.get(`/chat/doctorData/${id}`);
    return data;
}

export async function chatData(id){
    console.log(id,'apiiiii');
    const data = await chatInstance.get(`/chat/chat/${id}`);
    return data;
}
