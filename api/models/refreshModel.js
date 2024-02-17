// const mongoose=require('mongoose')
import mongoose from "mongoose";
const Schema=mongoose.Schema
const refreshSchema=new Schema({
    token:{type:String,required:true},
    userId:{type:Schema.Types.ObjectId,ref:'users'}
})
const refreshModel=mongoose.models.refreshes || mongoose.model('refreshes',refreshSchema)
// module.exports=refreshModel;
export default refreshModel;