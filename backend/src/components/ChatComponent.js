import mongoose from "mongoose";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import Message from "../models/Message.js";


class ChatComponent {
    async GetAllChats(req, res) {
        try {
            const chats = await Chat.find().select("-messages");
            res.status(200).json(chats);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching chats' });
        }
    }

    async CreateChat(req, res) {
        try {
            const creator = await User.findById(req.body.creator_id)
            if (!creator) {
                return res.status(404).json({ error: "Creator not found" });
            }

            const newChat = new Chat(req.body);
            await newChat.save();

            res.status(201).json({ message: "Chat has been created" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred while creating the chat" });
        }
    }

    async getChatById(req, res) {
        try {
            const chat_id = req.params.chat_id;
            const isValidObjectId = mongoose.Types.ObjectId.isValid(chat_id);

            if (!isValidObjectId) {
                return res.status(400).json({ error: "Invalid chat ID format" });
            }

            const chat = await Chat.findById(chat_id);
            

            if (!chat) {
                return res.status(404).json({ error: "Chat not found" });
            }

            res.json(chat);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async getAllMessages(req,res){
        try{
            const chat_id = req.query.chat_id;

            const isValidObjectId = mongoose.Types.ObjectId.isValid(chat_id);
            if (!isValidObjectId) {
                return res.status(400).json({ error: "Invalid chat ID format" });
            }

            const chat = await Chat.findById(chat_id);
            if (!chat) {
                return res.status(404).json({ error: "Chat not found" });
            }

            
            const messagePromises = chat.messages.map(async (message_id) => {
                const message = await Message.findById(message_id);
                return message;
            });

            const messages = await Promise.all(messagePromises);
    
            res.status(200).json(messages)
        }
        catch (error){
            console.log(error);
        }
    }


    async addMessageToChat(req,res){
        try{

            const {user_id,chat_id,content} = req.body;
            let errorMessage = [];


            if (!user_id || !chat_id || !content){
                return res.status(400).json({error:"fields are empty"})
            }
            if (!mongoose.isValidObjectId(user_id)) {
                errorMessage.push("user_id not valid")     
            }
            if (!mongoose.isValidObjectId(chat_id)) {
                errorMessage.push("chat_id not valid")     
            }
            if (errorMessage.length == 0){
                const chat = await Chat.findById(chat_id);
                const user = await User.findById(user_id);
                
                
                if (chat == null){
                    errorMessage.push("chat not found")
                }
                if (user == null){
                    errorMessage.push("user not found")
                }
                if (errorMessage.length != 0){
                    return res.status(400).json(errorMessage) 
                }

                const newMessage = new Message({
                    sender_id: user_id,
                    chat_id: chat_id,
                    username:user.username,
                    content: content,
                });

                await newMessage.save();
        

                chat.messages.push(newMessage)
                await chat.save()
                 
                res.status(201).json({ message: "Message added to the chat" });
            
            }else {
                res.status(400).json(errorMessage);
            }
        

        }catch (error) {
            console.log(error);
            return res.status(500).json({ error: "An error occurred while adding the message to the chat" });
        }


    }

    async addMemberToChat(req, res) {
        //  example input data
        // {
        //     "chat_id":"",
        //     "user_id":""
        // }

        try {
            const chat = await Chat.findById(req.body.chat_id);

            const user_id = req.body.user_id;

            if (!chat) {
                return res.status(404).json({ error: "Chat not found" });
            }

            const userExists = chat.users.includes(user_id);

            if (userExists) {
                return res.status(409).json("User already exists in the chat");
            }

            chat.users.push(user_id);
            await chat.save();

            res.status(201).json("User added to the chat");
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred while adding the user to the chat" });
        }
    }

    async deleteChat(req, res) {
        try {
            const chatId = req.params.chat_id;
            await Chat.findByIdAndDelete(chatId);
            res.json({ message: "Chat deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred while deleting the chat" });
        }
    }
}

export default ChatComponent;