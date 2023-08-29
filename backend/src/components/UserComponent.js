import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

console.log("user component init");

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

    async getUserById(req, res) {
        try {
            const user_id = req.params.user_id;
            const user = await User.findById(user_id);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching the user' });
        }
    }

    async DeleteUser(req, res) {
        try {
            const user_id = req.params.user_id;
            await User.findByIdAndDelete(user_id);
            res.send("User has been deleted");
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while deleting the user' });
        }
    }

    async Login(req, res) {
        try {
            const formPassword = req.body.password;
            const mail = req.body.email;

            const user = await User.findOne({ email: new RegExp('^' + mail + '$', "i") });

            if (!user) {
                return res.status(404).json({ error: "Email not found" });
            }

            const result = await bcrypt.compare(formPassword, user.password);

            if (!result) {
                return res.status(401).json({ error: "Wrong password" });
            }

            const token = jwt.sign(
                {
                    userId: user._id,
                },
                process.env.PRIVATE_KEY_JWT,
                { expiresIn: "24h" }
            );

            res.status(200).json({
                message: "Successful login",
                token: token
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred during login' });
        }
    }

    async CheckToken(req, res) {
        try {
            // const decoded = jwt.verify(req.cookies.token, process.env.PRIVATE_KEY_JWT);
            // console.log(decoded);
            res.json(req);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while checking the token' });
        }
    }
}

export default UserComponent;