
import express from 'express';
const app=express()
import dotenv from "dotenv"
import cors from 'cors'
import ConnectDB from './utils/db.js';
import userRouter from "./routes/users.routes.js"
import hotelRouter from "./routes/myhotel.routes.js"
import hotelsRouter from "./routes/hotels.routes.js"
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
const corOption={
    credentials:true,origin:['http://localhost:5173']
}

dotenv.config()
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
})
app.use(cookieParser())
app.use(cors(corOption))
ConnectDB()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/users",userRouter)
app.use("/api/my-hotels",hotelRouter) 
app.use("/api/hotels",hotelsRouter)
const server=app.listen(8000,()=>{
    console.log(`Server Started at port ${server.address().port} `)
})

app.use((error,req,res,next)=>{
    const statusCode=error.statusCode || 500
    const message=error.message || "Internal Server Error"
    return res.status(statusCode).send({success:false,statusCode,message})
    })