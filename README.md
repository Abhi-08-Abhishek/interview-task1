
# .env file
PORT = 0000
MONGO_DB = cluster Url
JWT_SECRET = // openssl rand -hex 32 for secret key

## dependencies ##

"scripts": {
    "test": "node index.js",
    "start": "nodemon index.js"
  },

"dependencies": {
    "bcryptjs": "^3.0.2",
    "cookie-parser": "^1.4.7",
    "dotenv": "^16.5.0",
    "express": "^5.1.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.15.1",
    "nodemon": "^3.1.10"
  }
  
 # create folder backend
 # folder structure
  ![image](https://github.com/user-attachments/assets/3966a0a5-402f-4094-bf2d-c2cad9543ca6)

  # to start node project
    npm init -y 

### folders ###

 # config:-
  db.js [for mongo db connection]
  
 # controllers:-
  user controller [user, signup, login, logout]
  review controller [addReview, getReview, updateReview , deleteReview]
  book controller [addBook , getBooks, getBookById]

 # Middlewares:-
  AuthUser [authUser] for jwt authentication

 # models:-
  book [book collection and review collection]
 # bookschema:-
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

 # Reviewschema:-
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

 # user [user collection]
 # userschema:-
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



# generate token
userSchema.methods.generateToken = function(){
    const secret = process.env.JWT_SECRET
    const token = jwt.sign({_id: this._id},secret,{expiresIn:'24h'}  
    );
    return token
};

# hash password
userSchema.statics.hashPassword = async(password)=>{
    return await bcrypt.hash(password , 10);
};

# compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
}


#  routes:-    
  http://localhost:3000/api/
   
 # book [/add , /get , /get/:id]
  
  router.post('/add',authUser, addBook);
  router.get('/get',authUser, getBooks);
  router.get('/get/:id',authUser, getBookById);
  
 # review [/add/:bookId , /get/:bookId , /update/:id , /delete/:id]

  router.post('/add/:bookId',authUser,addReview);
  router.get('/get/:bookId', authUser,getReviews);
  router.put('/update/:id',authUser,updateReview);
  router.delete('/delete/:id',authUser,deleteReview);
  
 # user [/signup ,/login ,/logout ,/me ]

   router.post('/signup',signup);
   router.post('/login',login);
   router.post('/logout',authUser,logout);
   router.get('/me',authUser,getUser);

#  index.js:-
  app.use('/api/user/',userRouter);
  app.use('/api/books/',bookRouter);
  app.use('/api/reviews/',reviewRouter);


### Postman Api test:- ###

### User ###

User signup: post method
http://localhost:3000/api/user/signup
JSON DATA
{
"name":"John Doe",
"email":"example@gmail.com",
"password":""
}

User login: post method
http://localhost:3000/api/user/login
JSON DATA
{
"email":"example@gmail.com",
"password":""
}

User logout: post method
http://localhost:3000/api/user/logout

User getUser: get method
http://localhost:3000/api/user/me

### Books ###

add Book: post method
http://localhost:3000/api/books/add
JSON DATA
{
"title":"story",
"author":"john",
"description":"This is amazing story book",
"price":200
}

get Book: get method
http://localhost:3000/api/books/get

get Book by Id: get method
http://localhost:3000/api/books/get/:id of book

### Reviews ###

addReview : post method
http://localhost:3000/api/reviews/add/:bookId {book id on which you have to give review}

JSON DATA
{
"rating":"****",
"comment":""
}

getReview : get method
http://localhost:3000/api/reviews/get/:bookId {book id on which you have to check review}

updateReview : put method
http://localhost:3000/api/reviews/update/:id {review id on which you have to update review}

deleteReview : delete method
http://localhost:3000/api/reviews/delete/:id {review id on which you have to delete}



