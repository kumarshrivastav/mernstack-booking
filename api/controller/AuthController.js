import userModel from '../models/user.js'
import {verifyLogin,verifyRegistration} from '../utils/client.validation.js'
import ErrorHandler from "../utils/error.handler.js"
import TokenService from "../service/TokenService.js"
import {validationResult} from 'express-validator'
import bcryptjs from "bcryptjs"
class AuthController{
    async login(req,res,next){
        const errors=validationResult(req)
        if(!errors.isEmpty()){
        return next(ErrorHandler(400,errors.array()))
        }
        const body=req.body;
        if(!body.email || !body.password){
            return next(ErrorHandler(400,'please provide all fields'));
        }
        const error=verifyLogin(body)
        if(error){
            return next(ErrorHandler(400,error.details[0].message))
        }
        try {
            const user=await userModel.findOne({email:body.email})
            if(!user){
                return next(ErrorHandler(404,'user not found with this email'))
            }
            const comparePwd=await bcryptjs.compare(body.password,user.password)
            if(!comparePwd){
                return next(ErrorHandler(400,"Invalid email/password"))
            }
            const {accessToken,refreshToken}=TokenService.generateToken({_id:user._id})
            res.cookie("accessToken",accessToken,{maxAge:1000*60*60,httpOnly:true})
            res.cookie("refreshToken",refreshToken,{maxAge:1000*60*60*24*365,httpOnly:true})
            res.userId=user._id
            const {password,...rest}=user._doc
            return res.status(200).send(rest)
        } catch (error) {
            return next(error)
        }
        

    }

    async register(req,res,next){
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return next(ErrorHandler(400,errors.array()))
        }
        const body=req.body;
        if(!body.firstName || !body.lastName || !body.email || !body.password){
            return next(ErrorHandler(400,'please provide all fields'))
        }

        const error=verifyRegistration(body)
        if(error){
            return next(ErrorHandler(400,error.details[0].message))
        }
        try {
            var user=await userModel.findOne({email:req.body.email})
            if(user){
                return next(ErrorHandler(400,'User already exists'))
            }
            user=new userModel(body)
            const salt=await bcryptjs.genSalt(10)
            user.password=await bcryptjs.hash(body.password,salt)
            await user.save()
            return res.status(200).send("User Registered Successfully")
        } catch (error) {
            return next(error)
        }
    }
    async verifyToken(req,res){
        return res.status(200).send({userId:req.userId})
    }
    async logout(req,res){
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        return res.status(200).send("User logout successfully")
    }
    async me(req,res,next){
        try {
            const userId=req.userId
             const user=await userModel.findById(userId).select('-password')
             if(!user){
                return next(ErrorHandler(400,'User not found'))
             }
             return res.status(200).send(user)
        } catch (error) {
            return next(error)
        }
    }
}

export default new AuthController()