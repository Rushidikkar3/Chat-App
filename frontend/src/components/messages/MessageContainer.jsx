import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useEffect } from "react";
import {useAuthContext} from "../../context/AuthContext";

const MessageContainer = () => {
  // const selectedConversation = false;

  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  //    this is a cleanup function used to prev selected chat after relogin

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <ChatSelected conversation={selectedConversation} />
      )}
    </div>
  );
};

const NoChatSelected = () => {
	const {authUser} = useAuthContext();//this help to know logged user
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

const ChatSelected = ({ conversation }) => {
  return (
    <>
      {/* Header */}
      <div className="bg-slate-500 px-4 py-2 mb-2">
        <span className="label-text">To:</span>
        <span>
          {/* {Conversation.fullName} */}
          {conversation && conversation.fullName ? ( // Check for data availability
            <span className="text-gray-900 font-bold">
              {conversation.fullName}
            </span>
          ) : (
            <p>Loading conversation...</p> // Handle loading state
          )}
        </span>
      </div>

      <Messages />
      <MessageInput />
    </>
  );
};
export default MessageContainer;
