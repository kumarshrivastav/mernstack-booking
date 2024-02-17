// const mongoose=require('mongoose')
import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true}
})

const userModel=mongoose.models.users || mongoose.model("users",userSchema);
// module.exports=userModel;
export default userModel;