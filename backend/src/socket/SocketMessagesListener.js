import { Server } from 'socket.io';

function SocketMessagesListener(express_server){


    const io = new Server(express_server);


    io.on('connection', (socket) => {
        console.log('a user connected');
    });

    return io

}

export default SocketMessagesListener