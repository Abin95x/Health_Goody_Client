import axios from 'axios';
const baseURL = 'https://health-goody-server.onrender.com';
// const baseURL = 'http://localhost:3001/';

const messageInstance = axios.create({ baseURL: baseURL });


export async function getMessages(id) {
    const data = await messageInstance.get(`/message/getMsg/${id}`)
    return data
}

export async function addMessage(data) {
    const datas = await messageInstance.post('/message/addMsg', data)
    return datas
}