import React, { useEffect, useState } from 'react';
import { chatData } from '../../../Api/chatApi';
import { useSelector } from 'react-redux';
import ChatList from '../../../Components/ChatComponents/ChatList/ChatList';
import ChatBox from '../../../Components/ChatComponents/ChatBox/ChatBox';

const Chat = () => {

    const [chats, setChats] = useState([]);
    console.log(chats);   
    console.log(chats[0]);
    const { _id } = useSelector((state) => state.reducer.userReducer.user);

    
  
    useEffect(() => {
      chatData(_id)
        .then((res) => {
          setChats(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, [_id]);



  return (
    <div className='bg-blue-50'>

        <br /> 
        <br />
        <div className='min-h-screen bg-blue-50 flex justify-center'>
          <ChatList/>
          <ChatBox/>
        </div>
  
    </div>
  );
};

export default Chat;