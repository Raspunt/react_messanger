import { Server } from 'socket.io';

import ChatComponentSocket from '../components/ChatComponentSocket.js';

function SocketMessagesListener(express_server,allow_hosts){


    const ccs = new ChatComponentSocket()


    const io = new Server(express_server,{
        cors: {
            origin: allow_hosts,
        },
        cookie:{
            httpOnly: true
        }
    });


    io.on('connection', (socket) => {

        socket.on("get_messages", (arg) => {
            SendAsyncMessages(socket,arg)
        });


    });

    async function SendAsyncMessages(socket,arg){
        const {chat_id,page , perPage} = arg
        const data = await ccs.getMessages(chat_id,page,perPage)
        socket.emit("set_messages",data)
    }

    return io

}


export default SocketMessagesListener;