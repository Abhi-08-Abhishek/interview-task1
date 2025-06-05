import User from "../model/user.js";


export const signup = async(req,res)=>{
    try {
        // get data from body
        const {name, email, password} = req.body;
        // all fields are required
        if(!name || !email || !password){
            return res.status(400).json({message:'All fields are required'});
        }
        // check if user already exists
        const ExistUser = await User.findOne({email});
        // if user already exists
        if(ExistUser){
            return res.status(400).json({message:'User already exists'});
        }
        // hash password
        const hash = await User.hashPassword(password);
        // create user
        const newUser = new User({
            name,
            email,
            password: hash
        });
        // save user
        await newUser.save();

        res.status(201).json({message:'User created successfully' , user:newUser});
    } catch (error) {
        console.log('Error in signup controller',error);
        res.status(500).json({error:error.message});
    }
}

export const login = async(req,res)=>{
   try {
         // get data from body
        const {email , password} = req.body;
        // all fields are required
        if(!email || !password){
            return res.status(400).json({message:'All fields are required'});
        }
        // check if user already exists
        const user = await User.findOne({email}).select('+password');
        // if user already exists
        if(!user){
            return res.status(400).json({message:'User not found pls siqnup'});
        }
        // compare password
        const isMatch = await user.comparePassword(password);
        // if password does not match
        if(!isMatch){
            return res.status(400).json({message:'Invalid credentials'});
        }
        // generate token
        const token = user.generateToken();
        // set cookie
        res.cookie('jwt' , token);
        
        res.status(200).json({message:'User logged in successfully', data:user, token});
   } catch (error) {
         console.log("Error in login controller", error);
        res.status(500).json({message:error.message});
  
   } 
}

// testing route
export const getUser = async(req,res)=>{
   try {
        // auth user data
        const userData = req.user;

        if(!userData){
            return res.status(400).json({message:'User not found'});
        }

        res.status(200).json({ success: true,user: userData});

   } catch (error) {
         console.log("Error in getUser controller" , error);
   }
}


export const logout = async(req,res)=>{
    try {
        res.clearCookie('jwt');
        res.status(200).json({message:'User logged out successfully'});
    } catch (error) {
         console.log("Error in logout controller" + error);
        res.status(500).json({message:error.message});
    }
}