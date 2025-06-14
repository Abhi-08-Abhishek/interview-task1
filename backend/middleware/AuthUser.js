import jwt from 'jsonwebtoken';
import User from '../model/user.js';

export const authUser = async(req,res,next)=>{
    try {
        const token  = req.cookies.jwt;

        if(!token){
            return res.status(401).json({message:'Unauthorized'});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message:'Unauthorized'});
        }
        const user = await User.findById(decoded._id).select('-password');
        if(!user){
            return res.status(401).json({message:'User not found'});
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}