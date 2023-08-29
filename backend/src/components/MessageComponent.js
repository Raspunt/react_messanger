import Message from "../models/Message.js"; // Import the Message model
import Chat from "../models/Chat.js";


class MessageComponent {
    
    async CreateMessage(req, res) {
        try {
            const newMessage = new Message(req.body);
            await newMessage.save();
            res.status(201).json({ message: "Message create successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred while sending the message" });
        }
    }

    async CreateMessageInChat(req, res) {
        try {

            const chat_id = re.body.chat_id

            const newMessage = new Message(req.body);
            await newMessage.save();
            res.status(201).json({ message: "Message create successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred while sending the message" });
        }
    }
    

    async GetMessagesByChatId(req, res) {
        try {
            const chat_id = req.params.chat_id;
            const messages = await Message.find({ chat_id });
            res.json(messages);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred while fetching messages" });
        }
    }

    async DeleteMessage(req, res) {
        try {
            const message_id = req.params.message_id;
            await Message.findByIdAndDelete(message_id);
            res.json({ message: "Message deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred while deleting the message" });
        }
    }
}

export default MessageComponent;