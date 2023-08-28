import bcrypt  from "bcryptjs";
import jwt from 'jsonwebtoken';


import User from "../models/User.js"

console.log("user component init");

class UserComponent{


    async  GetAllUsers(req,res){
        try {
            const users = await User.find()
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching users' });
        }
    }

    async CreateUser (req,res){

        console.log(req.body);
        res.setHeader('Content-Type', 'application/json');

 
        let user = new User(req.body);
        try {
            await user.save();
            res.json("user has been created");
        } catch (err) {
            // console.log(err.message.split(","))
            res.json(err.message.split(","));
        }
        
        
        
        

    }

    async getUserById(req,res){

        const user_id = req.params.user_id
        const user = await User.findById(user_id);

        res.json(user);


    }

    async DeleteUser(req,res) {

        const user_id = req.params.user_id
        await User.findByIdAndDelete(user_id);
        res.send("user has been deleted");
    }


    async Login(req,res){


        const formPassword = req.body.password;
        const mail = req.body.email;

        const user = await User.findOne({email: new RegExp('^'+mail+'$', "i")})
        if (user != null){
            const result = await bcrypt.compare(formPassword, user.password);

            if (result == false){
                res.json({
                     status: false,
                     message:"wrong_password"
                })
            }
            else
            {
                
                const token = jwt.sign(
                    {
                        userId: user._id,
                        // userEmail: user.email,
                    },process.env.PRIVATE_KEY_JWT,
                    { expiresIn: "24h" }
                )

                res.status(200)
                res.json({
                    status: true,
                    message:"successful_login",
                    token:token
                })


            }

        }else {
            res.status(404)
            res.json({
                status: false,
                message:"Email_not_found"
           })
        }
    }

    async CheckToken(req,res){

        // const decoded = jwt.verify(req.cookies.token, process.env.PRIVATE_KEY_JWT);
        // console.log(decoded);
        res.json(req)
    }









}



export default UserComponent;