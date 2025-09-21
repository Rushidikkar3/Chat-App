import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, emoji, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  //use to set blue clr to selected chat

  const {onlineUsers} = useSocketContext()
  // const isOnline = onlineUsers.find((user) => user._id === conversation.user._id)
  const isOnline = onlineUsers.includes(conversation._id)

  return (
    <>
      <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
		${isSelected && "bg-sky-500"}
	`}
		onClick={() => setSelectedConversation(conversation)}
	>
        <div className={`avatar ${isOnline?"online":""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
      {/* this is lastline of chat if chat is lastone then it doesn't show divider*/}
    </>
  );
};
export default Conversation;
