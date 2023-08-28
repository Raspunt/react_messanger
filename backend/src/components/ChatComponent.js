import mongoose from "mongoose";

import Chat from "../models/Chat.js"
import User from "../models/User.js";


console.log("chat component init");

class ChatComponent{
 
    async  GetAllChats(req,res){
        try {
            const chats = await Chat.find();
            res.json(chats);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching users' });
        }
    }

    async CreateChat (req,res){

        console.log(req.body);

        let chat = new Chat(req.body);
        try {
            await chat.save();
            res.json("chat has been created");
        } catch (err) {
            // console.log(err.message.split(","))
            res.json(err.message.split(","));
        }



        // return await User.create(userData);
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

        }catch(error){
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
        
    
    }
    


    async addUserToChat(req,res){

        const chat = await Chat.findById(req.body.chat_id)
        // const user = Chat.findById(req.body.user_id)

        const user_id = req.body.user_id;

        const result = await User.findOne({ _id: user_id}).select("_id").lean();
        if (!result) {
            chat.users.push(user_id)
            chat.save()
            
            res.status(201);
            res.json("user successful created")
        }else {
            res.status(409);
            res.json("user already exist")
        }





    }



    async deleteChat(req,res) {
        return await Chat.findByIdAndDelete(ChatId);
    }
    




}



export default ChatComponent;