import Message from "../models/Message.js";

class ChatComponentSocket{

    async getMessages(chat_id,page,perPage){
        
        try {
            const messages = await Message
                .find({chat_id:chat_id})
                .sort({ timestamp: -1 }) 
                .skip((page - 1) * perPage) 
                .limit(perPage); 

            return messages

        }catch(err) {
            console.log(err);
           
        }
    }
}


export default ChatComponentSocket;