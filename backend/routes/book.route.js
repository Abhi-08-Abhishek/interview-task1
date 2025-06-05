import express from 'express';
import { addBook, getBookById, getBooks } from '../controller/book.controller.js';
import { authUser } from '../middleware/AuthUser.js';
const router = express.Router();

router.post('/add',authUser, addBook);

router.get('/get',authUser, getBooks);

router.get('/get/:id',authUser, getBookById);

export default router;