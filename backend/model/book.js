import mongoose from "mongoose";

// book schema
const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },

},{timestamps:true});

export const Book = mongoose.model('Book',bookSchema);




// review schema
const reviewSchema = new mongoose.Schema({
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book',
        required:true,
    }, 
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true, 
    },
    rating:{
        type:String,
        required:true,  
    },
    comment:{
        type:String,
        required:true, 
    },
},{timestamps:true});

export const Review = mongoose.model('Review',reviewSchema);



