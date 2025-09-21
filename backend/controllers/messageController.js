import Message from "../models/messageModel.js"
import Conversation from "../models/conversationModel.js"
import { getReceiverSocketId ,io} from "../socket/socket.js"


export const sendMessage = async(req, res) => {
   try {
    const {message} = req.body
    const {id:receiverId} = req.params
    const senderId = req.user._id

    let conversation = await Conversation.findOne({participants: {$all: [senderId, receiverId]}})
    // all means conversation must include all this

    if(!conversation) {
        conversation = await Conversation.create({participants: [senderId, receiverId]})
    }

    const newMessage = await Message.create({senderId, receiverId, message})

    if(newMessage) {
        conversation.messages.push(newMessage._id)
    }

    // await conversation.save()  //run on 1sec
    // await newMessage.save()    //run on 2 sec
    
    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()])

    // SOCKET IO FUNCTIONALITY to send the live message updates 
	const receiverSocketId = getReceiverSocketId(receiverId);
	if (receiverSocketId) {
		// io.to(<socket_id>).emit() used to send events to specific client
		io.to(receiverSocketId).emit("newMessage", newMessage);
	}

    res.status(201).json(newMessage)

   } catch (error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({error: "Internal server error"})
   }
}

export const getMessage = async(req, res) => {
    try {
        const {id:receiverId} = req.params
        const senderId = req.user._id

        // const conversation = await Conversation.findOne({participants: {$all: [senderId, receiverId]}})
        // this returns only conversation
        
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        }).populate("messages"); // actual messages
        // using populate() is a good approach if your Conversation schema has a reference to the Message model. By populating the messages field, you directly get the actual messages in the conversation object.

        if(!conversation) {
            return res.status(404).json([])
            console.log("Conversation not found")
        }

        const messages = conversation.messages;
       
        
        // const messageIds = conversation.messages; // this returns only array of messageID
        // const messages = await Promise.all(messageIds.map(async (messageId) => {
        //     const message = await Message.findById(messageId);
        //     return message;
        // }));
        // By using `Promise.all()`, the code ensures that all promises inside the `map` function are resolved before proceeding. This will give you the `messages` array with the resolved values.



        res.status(200).json(messages)

    } catch (error) {
        console.log("Error in getMessage controller: ", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}