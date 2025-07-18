import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import morgan from 'morgan'
import  connectdb from './config/dbconnection.js';
import userRoutes from './routes/user.routes.js'
import prodcutsRoutes from './routes/products.routes.js';
import errormiddlewarwe from './middleware/error.middleware.js';

dotenv.config();

connectdb();
const app = express ()


app.use(express.json())
app.use(cors({
    origin : 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser());
app.use(morgan('dev'))

// user related Routes
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/products',prodcutsRoutes)


// testing routes
app.use('/test',(req,res)=>{
    res.send("tested, app is runnig successfully")
})


//other than routes 
// app.all('*',(req,res) => {
//     res.status(404).send('Page Not Found')
// });

app.use(errormiddlewarwe);


export default app;
