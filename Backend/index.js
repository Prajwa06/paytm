const express=require('express');
const connectDB=require('./connectDB');
const app=express();
const cors=require('cors');
const mainRouter=require("./routes/index");
const userRouter=require('./routes/user');
const accountRouter=require('./routes/account');

connectDB();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
/// routes
app.use('/api/v1', mainRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/account',accountRouter);



// app
app.listen(3000, ()=>{
    console.log("App is runnning on port 3000");
});