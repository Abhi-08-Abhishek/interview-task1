import express from "express";
import { getUser, login, logout, signup } from "../controller/user.controller.js";
import { authUser } from "../middleware/AuthUser.js";
const router = express.Router();

router.post('/signup',signup);

router.post('/login',login);

router.post('/logout',authUser,logout);

router.get('/me',authUser,getUser);

export default router;