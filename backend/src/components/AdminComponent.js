import Chat from "../models/Chat.js";
import User from "../models/User.js";


class AdminComponent{
    
    

    async GetAllCollection (req,res){

        const users = await User.find();
        const chats =  await Chat.find();
        
        let data = []

        data.push({
            "modelName":"Chat",
            "collectins":chats
        })
        data.push({
            "modelName":"User",
            "collectins":users
        })
        res.json(data)
    }


}
 

export default AdminComponent;