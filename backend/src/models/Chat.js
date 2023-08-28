import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creator_id: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
  users: [{type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  avatarImage:{type:String,default:""}

});

const Chat = mongoose.model('Chat', chatSchema);


export default Chat;