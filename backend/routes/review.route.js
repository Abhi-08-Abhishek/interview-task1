import express from 'express';
import { authUser } from '../middleware/AuthUser.js';
import { addReview, deleteReview, getReviews, updateReview } from '../controller/review.controller.js';
const router = express.Router();

router.post('/add/:bookId',authUser,addReview);

router.get('/get/:bookId', authUser,getReviews);

router.put('/update/:id',authUser,updateReview);

router.delete('/delete/:id',authUser,deleteReview);

export default router;