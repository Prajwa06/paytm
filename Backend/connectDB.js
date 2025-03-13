require ("dotenv").config()
const mongoose=require('mongoose');
const username=process.env.USER;
const password=process.env.PASSWORD;
const connectDB =()=>{

   
    mongoose.connect(
        `mongodb+srv://${username}:${password}@cluster0.germ9.mongodb.net/`
    )

    const db=mongoose.connection;

    db.once("open", ()=>{
        console.log("DB is connected");
    });

    
}


module.exports=connectDB;