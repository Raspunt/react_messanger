import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import User from "../models/User.js";


class UserComponent {
    async GetAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching users' });
        }
    }

    async CreateUser(req, res) {
        try {
            const user = new User(req.body);
            await user.save();
            res.json("User has been created");
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while creating the user' });
        }
    }

    // async getUserById(req, res) {
    //     try {
    //         const user_id = req.params.user_id;
    //         const user = await User.findById(user_id);

    //         if (!user) {
    //             return res.status(404).json({ error: "User not found" });
    //         }

    //         res.json(user);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: 'An error occurred while fetching the user' });
    //     }
    // }

    async CheckAuthentication(req, res) {

        try {
            let user_token = req.cookies.token;
            let user_id = jwt.verify(user_token, process.env.PRIVATE_KEY_JWT)["userId"]

            const user = await User.findOne({_id:user_id})

            if (!user) {
                return res.status(401).json({
                    error: "user not found"
                });
            }

            res.status(200).json({
               message:"auntification succsess"
            });

        }catch (error){

            if (error instanceof jwt.JsonWebTokenError){
                return res.status(401).json({
                    error: "auntifcation error"
                });
            }else {
                return res.status(500).json({
                    error: "server error"
                });
            }

        }
    }

    async GetUserByToken(req,res){
        try{
            let user_token = req.cookies.token;
            let user_id = jwt.verify(user_token, process.env.PRIVATE_KEY_JWT)["userId"]

            const user = await User.findOne({_id:user_id})
                .select("-role")
                .select("-password")
                .select("-email")
                .select("-created")

            if (!user) {
                return res.status(401).json({
                    error: "user not found"
                });
            }

            res.status(200).json(user);


        }catch(err){
            console.log(err);
        }
    }

    // async DeleteUser(req, res) {
    //     try {
    //         const user_id = req.params.user_id;
    //         await User.findByIdAndDelete(user_id);
    //         res.send("User has been deleted");
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: 'An error occurred while deleting the user' });
    //     }
    // }

    async Login(req, res) {
        try {
            const formPassword = req.body.password;
            const mail = req.body.email;
            
            const user = await User.findOne({ email: new RegExp('^' + mail + '$', "i") });

            if (!user) {
                return res.status(404).json({
                    message: "email_not_found"
                });
            }

            const result = await bcrypt.compare(formPassword, user.password);

            if (!result) {
                return res.status(401).json({
                    message: "wrong_password"
                });
            }

            const token = jwt.sign(
                {
                    userId: user._id,
                },
                process.env.PRIVATE_KEY_JWT,
                { expiresIn: "24h" }
            );
            res.cookie('token', token, {
                httpOnly: true,
            });
            res.status(200).json({message: "successful_login",});

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "error_during_login",
            });
        }
    }


}

export default UserComponent;