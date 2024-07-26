import express from "express";
import postRoute from './routes/post.route.js';
import authRoute from './routes/auth.route.js';
import testRoute from './routes/test.route.js';
import userRoute from './routes/user.route.js';
import chatRoute from './routes/chat.route.js';
import messageRoute from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();

app.use(cors ({ origin : process.env.CLIENT_URL, credentials : true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);
app.use('/api/test', testRoute);
app.use('/api/user', userRoute);
app.use('/api/messages', messageRoute);
app.use('/api/chats', chatRoute);

// app.use("/api/test", (req, res) =>{
//     res.status(200).json('test working successfully...')
// });



app.listen(8800, ()=> {
    console.log('server is running...!');
})