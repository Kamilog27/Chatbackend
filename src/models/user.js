const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        match:RegExp(/^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/)
    },
   nickname:{
       type:String,
       required:true,
       unique:true,
       maxlength:15
   },
   imageUrl:{
        type:String
   },
   password:{
       type:String,
       required:true,
       minlength:6
   },
   token:{
       type:String
   }
})
const User=mongoose.model("User",userSchema)
module.exports=User