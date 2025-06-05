import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
connectDB();
import userRouter from './routes/user.route.js';
import bookRouter from './routes/book.route.js';
import reviewRouter from './routes/review.route.js';


app.use(express.json());
app.use(cookieParser());


app.use('/api/user/',userRouter);
app.use('/api/books/',bookRouter);
app.use('/api/reviews/',reviewRouter);


const port = process.env.PORT  || 5000;

app.listen(port , ()=>{
    console.log(`server is running on port ${port} ${Date()} `)
})