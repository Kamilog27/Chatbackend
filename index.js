const express=require("express")
const app=express()
const cors=require("cors")
const userRouter=require("./src/routers/user")
const chatRouter=require("./src/routers/chat")
require("dotenv").config()
const mongoose=require("mongoose")
mongoose.connect(process.env.MONGOURL)

const port=process.env.PORT | 4123
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    next();
});
app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(chatRouter)
app.listen(port,()=>{
    console.log("Server runnig on "+port)
})