import mongoose from "mongoose";
import getUserMiddleware from "../Middleware/midUser.js"

const userSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true
  },
  avatarImage:{
    type:String,
    default:""
  },
  created: {
    type: Date,
    default: Date.now
  }

});


export default  mongoose.model('User', getUserMiddleware(userSchema));