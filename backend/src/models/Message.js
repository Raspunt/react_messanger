import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender_id: {type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  chat_id:{type:mongoose.Schema.Types.ObjectId,ref:"Chat",required:true},
  username:{ type:String,required:true},
  content: { type: String, required: true },

});



export default mongoose.model('Message', messageSchema);