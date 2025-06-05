import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        },
    password:{
        type:String,
        required:true,
        minLength:[6 , 'password should be atleast 6 characters'],
    },
    email:{
        type:String,
        required:true,
        unique:true, 
    },
},{timestamps:true});


// generate token
userSchema.methods.generateToken = function(){
    const secret = process.env.JWT_SECRET
    const token = jwt.sign({_id: this._id},secret,{expiresIn:'24h'}  
    );
    return token
};

// hash password
userSchema.statics.hashPassword = async(password)=>{
    return await bcrypt.hash(password , 10);
};

// compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
}


const User = mongoose.model('User',userSchema);

export default User;
