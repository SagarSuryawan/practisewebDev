
import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import morgan from 'morgan'


// import for socket.io
import http from 'http'; 


dotenv.config();
const app = express();
const port = process.env.PORT || 3000


const server = http.createServer(app);    // added for socket.io support 

app.get("/",(req,res)=>{
    res.send("Hello, World!");
})




server.listen(port, ()=> {
    console.log(`Server listen on  port ${port}`)
})


