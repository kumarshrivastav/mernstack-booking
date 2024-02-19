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

            // const originalPwd=simplecrypt.decrypt(body.password)
            // await bcrypt.compare(body.password,user.password)
            const comparePwd=await bcryptjs.compare(body.password,user.password)
            if(!comparePwd){
                return next(ErrorHandler(400,"Invalid email/password"))
            }
            const {accessToken,refreshToken}=TokenService.generateToken({_id:user._id})
            TokenService.storeRefreshToken(refreshToken,user._id)
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
    // async refresh(req,res){
        
    //         try {
    //             // fetch refresh token from cookies
    //         const {refreshToken:refreshTokenFromCookie}=req.cookies
    //         // check refresh token is valid or not
    //         const userId=TokenService.verifyRefreshToken(refreshTokenFromCookie)
    //         if(!userId){
    //             return res.status(401).send("Token Expired")
    //         }
    //         // check refresh token is present in db or not
    //         const token=await TokenService.findRefreshToken(refreshTokenFromCookie,userId._id)
    //         if(!token){
    //             return res.status(401).send('Invalid Token')
    //         }
    //     } catch (error) {
    //         return res.status(500).send("Internal Server Error")
    //     }
    //     // check valid user or not
    //     var user;
    //     try {
    //         user=await userModel.findOne({_id:userId._id})
    //         if(!user){
    //             return res.status(404).send("User Not Found")
    //         }
    //     } catch (error) {
    //         return res.status(500).send("Internal Server Errro")
    //     }
        
    //     // generate new token
    //     const {accessToken,refreshToken}=TokenService.generateToken({_id:user._id})
    //     // update refresh token in db and set cookie with new tokens
    //     res.cookie('accessToken',accessToken,{maxAge:1000*60*60,httpOnly:true})
    //     res.cookie('refreshToken',refreshToken,{maxAge:1000*60*60*24*365,httpOnly:true})
    //     try {
    //         await TokenService.updateRefreshToken(userId._id,refreshToken)
    //     } catch (error) {
    //         return res.status(500).send("Internal Server Error",500)
    //     }
    //     return res.status(200).send({user:user,isLoggedIn:true})
    // }
    async verifyToken(req,res){
        return res.status(200).send({userId:req.userId})
    }
    async logout(req,res){
        const {refreshToken}=req.cookies
        // await TokenService.removeRefreshToken(refreshToken)
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        return res.status(200).send("User logout successfully")
    }
}

export default new AuthController()