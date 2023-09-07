import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creator_id: {type:mongoose.Schema.Types.ObjectId,ref:"User",required: true},
  members: [{type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  avatarImage:{type:String,default:""}

});


export default mongoose.model('Chat', chatSchema);;