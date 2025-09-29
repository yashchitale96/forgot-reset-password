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
    origin:"http://localhost:5173",
    credentials:true
}))

app.use('/api/auth', userRouter)

connectDB();
app.listen(process.env.PORT, ()=>{
    console.log("Server is running")
})