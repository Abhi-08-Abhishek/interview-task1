import { Review } from "../model/book.js";



export const addReview = async(req,res)=>{
    try {
        const {bookId} = req.params

        const {rating , comment} = req.body;
        
        if(!bookId){
            return res.status(400).json({message:'Book id is required'});
        }

        const review = await Review.create({
           rating,
           comment,
           user:req.user.id,
           book:bookId
        });
        res.status(200).json({message:'Review added successfully', review:review})

    } catch (error) {
        console.log('Error in addReview controller',error);
        res.status(500).json({error:error.message});
    }
}

export const getReviews = async(req,res)=>{
   try {
        const {bookId} = req.params

        const reviews = await Review.find({book:bookId});

        if(!reviews){
            return res.status(400).json({message:'No reviews found'});
        }
        res.status(200).json({reviews:reviews})
   } catch (error) {
        console.log('Error in getReviews controller',error);
        res.status(500).json({error:error.message});
   } 
}


export const updateReview = async(req,res)=>{
    try {
        
        const review = await Review.findById(req.params.id);
        if(!review){
            return res.status(400).json({message:'Review not found'});
        }

        if(review.user.toString() !== req.user.id){
            return res.status(400).json({message:'You are not allow to update this review'});
        }
        review.rating = req.body.rating || review.rating;
        review.comment = req.body.comment || review.comment;

        await review.save();

        res.status(200).json({message:'Review updated successfully', review:review})

    } catch (error) {
        console.log('Error in updateReview controller',error);
        res.status(500).json({error:error.message});
    }
}


export const deleteReview = async(req,res)=>{
    try {
        const {id} = req.params

        let review = await Review.findById(id);

        if(!review){
            return res.status(400).json({message:'Review not found'});
        }
        if(review.user.toString() !== req.user.id){
            return res.status(400).json({message:'You are not allow to delete this review'});
        }

         review = await Review.findByIdAndDelete(id);

        res.status(200).json({message:"Review deleted",review});

    } catch (error) {
        console.log('Error in deleteReview controller',error);
        res.status(500).json({error:error.message});
    }
}