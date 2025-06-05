import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        const Url = process.env.MONGO_DB
        const conn = await mongoose.connect(Url,{
            dbName:"assignment"
        });
        console.log(`database connected on ${conn.connection.host}`);
    } catch (error) {
        console.error('Database not connected' , error);
    }
}