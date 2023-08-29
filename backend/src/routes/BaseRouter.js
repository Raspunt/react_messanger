
import express from 'express';


import UserComponent from '../components/UserComponent.js';
import ChatComponent from '../components/ChatComponent.js';
import AdminComponent from '../components/AdminComponent.js';

let userComponent = new UserComponent()
let chatComponent = new ChatComponent()
let adminComponent = new AdminComponent();

const router = express.Router();

router.use((req, res, next) => {
  console.log(`${req.method} ${req.protocol}://${req.hostname}:${req.post}${req.url}`);
  
  // console.log(req.cookies.token);

  next()
});

router.get('/users',userComponent.GetAllUsers);
router.post('/user/Create',userComponent.CreateUser);
router.post("/user/Login",userComponent.Login);
router.post("/user/CheckToken",userComponent.CheckToken)

router.get('/user/:user_id',userComponent.getUserById);
router.delete('/user/:user_id',userComponent.DeleteUser);


router.get('/chats',chatComponent.GetAllChats);
router.get('/chat/:chat_id',chatComponent.getChatById);
router.post('/chat/Create',chatComponent.CreateChat);
router.post('/chat/addUser',chatComponent.addMemberToChat);
router.post("/chat/addMessage",chatComponent.addMessageToChat);

router.get("/collections/all",adminComponent.GetAllCollection);






export default router;