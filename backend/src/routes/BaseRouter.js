
import express from 'express';


import UserComponent from '../components/UserComponent.js';
import ChatComponent from '../components/ChatComponent.js';

let userComponent = new UserComponent()
let chatComponent = new ChatComponent()

const router = express.Router();

router.use((req, res, next) => {
  console.log(`${req.method} ${req.protocol}://${req.hostname}:${req.post}${req.url}`);
  
  // console.log(req.cookies.token);

  next()
});

router.get('/users',userComponent.GetAllUsers);
router.post('/user/Create',userComponent.CreateUser);
router.post("/user/Login",userComponent.Login);

router.delete('/user/:user_id',userComponent.DeleteUser);
router.get('/user/:user_id',userComponent.getUserById);
router.post('/user/AuthToken/',userComponent.CheckAuthentication);



router.get('/chats',chatComponent.GetAllChats);
router.get('/chat/:chat_id',chatComponent.getChatById);
router.post('/chat/Create',chatComponent.CreateChat);
router.post('/chat/addUser',chatComponent.addMemberToChat);
router.post("/chat/addMessage",chatComponent.addMessageToChat);







export default router;