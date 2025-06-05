import { Book } from "../model/book.js";

export const addBook = async(req,res)=>{
    try {
        
        if(!req.body){
            return res.status(400).json({message:'All fields are required'});
        }

        let book  = await Book.findOne({title: req.body.title});
        if(book){
            return res.status(400).json({message:'Book already exists'});
        }

        book = await Book.create(req.body);

        return res.status(201).json({message:'Book added successfully', book:book});

    } catch (error) {
        console.log('Error in addBook controller',error);
        res.status(500).json({error:error.message});
    }
}

export const getBooks = async(req,res)=>{
    try {
        
        const books = await Book.find()
        if(!books){
            return res.status(400).json({message:'No books found'});
        }
        res.status(200).json({books:books})

    } catch (error) {
        console.log('Error in getBooks controller',error);
        res.status(500).json({error:error.message});
    }
}

export const getBookById = async(req,res)=>{
    try {
        const {id} = req.params

        const book = await Book.findById(id);

        if(!book){
            return res.status(400).json({message:'No book found'});
        }
        res.status(200).json({book:book})
    } catch (error) {
        console.log('Error in getBookById controller',error);
        res.status(500).json({error:error.message});

    }
}
