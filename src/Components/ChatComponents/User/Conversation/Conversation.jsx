// import { format } from "timeago.js";
const Conversation = ({ currentUser, message }) => {
  return (
    <div id="messages" className="">
    
        <div className="chat-message">
          <div className="flex items-end justify-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
              <div>
                <span
                  className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white break-words"
                  style={{ maxWidth: "350px" }}
                >
                  {/* {message?.text} */}
                  heiiiiiiiiiiiiiii
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-end text-black font-extralight">
            {/* {format(message?.createdAt)} */}

            hoiiiiiiiii
          </div>
        </div>
      
    </div>
  );
};

export default Conversation;