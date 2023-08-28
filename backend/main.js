import express from 'express';
import bodyParser from 'body-parser';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


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
app.use(bodyParser.json());
app.use(cookieParser());
app.use(base_router);

const port = process.env.PORT
app.listen(port, () =>
  console.log('Example app listening on port 3000!'),
);