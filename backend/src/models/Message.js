import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
  username:{ type:String,required:true},
  content: { type: String, required: true },

});



export default mongoose.model('Message', messageSchema);