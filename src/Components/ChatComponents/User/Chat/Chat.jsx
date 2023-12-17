import React, { useEffect, useState } from 'react';
import { chatData } from '../../../../Api/chatApi';
import { useSelector } from 'react-redux';
import ChatList from '../../User/ChatList/ChatList';
import ChatBox from '../../User/ChatBox/ChatBox';
import { io } from 'socket.io-client';

const END_POINT = 'http://localhost:3001';

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const { _id } = useSelector((state) => state.reducer.userReducer.user);
  const userId = _id;
  console.log(messages)
  console.log(currentChat)

  

  // useEffect(() => {
  //   const socketInstance = io(END_POINT);

  // }, []);

  useEffect(() => {
    chatData(_id)
      .then((res) => {
        setConversations(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);



  return (
    <div className='bg-blue-50'>
    <div className='min-h-screen bg-blue-50 flex justify-center'>
      <div className='min-h-screen bg-blue-50'>
        <div className='w-full md:w-96 h-screen bg-white mx-auto md:me-10'>
          <div className='overflow-y-auto h-screen md:h-screen'>
            {conversations?.map((chat) => (
              <div key={chat._id} onClick={() => {setCurrentChat(chat);
                  // socket?.emit("join room", chat._id);
                }}
              >
                <ChatList
                  data={chat}
                  currentUserId={userId}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <ChatBox
        chat={currentChat}
        currentUser={userId}
        setMessages={setMessages}
        messages={messages}
        // socket={socket}
      />
    </div>
  </div>
  
  );
};

export default Chat;