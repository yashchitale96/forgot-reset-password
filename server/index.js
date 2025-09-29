const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const connectDB = require('./config/db')
const userRouter = require('./routes/user.routes.js');


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"https://laughing-journey-xjgq6x9wgjx2v5v5-5173.app.github.dev",
    credentials:true
}))

app.use('/api/auth', userRouter)

connectDB();
app.listen(process.env.PORT, ()=>{
    console.log("Server is running")
})