import express from 'express';
import bodyParser from 'body-parser';

import http from "http"

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from "cors"

import SocketMessagesListener  from "./src/socket/SocketMessagesListener.js"
import base_router from "./src/routes/BaseRouter.js"

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to the database');
})
.catch((error) => {
    console.error('Error connecting to the database:', error);
});



const app = express();
const server = http.createServer(app);

SocketMessagesListener(server);


app.use(cors({
	origin: 'http://192.168.1.22:3030',
	credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(base_router);

app.use('/static', express.static('public'))


const port = process.env.PORT
server.listen(port, () =>
  console.log('Example app listening on port 3000!'),
);