import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message_text: { type: String, required: true },
  creator_id: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
  avatarImage:{type:String,default:""}

});

const Message = mongoose.model('Message', messageSchema);


export default Message;