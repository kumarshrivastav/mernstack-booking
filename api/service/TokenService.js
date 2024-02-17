// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken"
// const refreshModel = require("../models/refreshModel");
import refreshModel from "../models/refreshModel.js"

class TokenService{
    generateToken(payload){
        const accessToken=jwt.sign(payload,process.env.JWT_ACCESS_TOKEN,{expiresIn:'1h'})
        const refreshToken=jwt.sign(payload,process.env.JWT_REFRES_TOKEN,{expiresIn:'1y'})
        return {accessToken,refreshToken}
    }
    verifyAccessToken(accessToken){
        return jwt.verify(accessToken,process.env.JWT_ACCESS_TOKEN)
    }
    verifyRefreshToken(refreshToken){
        return jwt.verify(refreshToken,process.env.JWT_REFRES_TOKEN)
    }
    async storeRefreshToken(refreshToken,userId){
        try {
            await refreshModel.create({token:refreshToken,userId:userId})
        } catch (error) {
            console.log(error.message)
        }
    }
    async findRefreshToken(token,userId){
        return await refreshModel.findOne({token,userId})
    }
    async updateRefreshToken(userId,token){
        return await refreshModel.updateMany({userId:userId},{token:token})
    }
    async removeRefreshToken(refreshToken){
        try {
            const docs=await refreshModel.findOne({token:refreshToken})
            await refreshModel.deleteMany({userId:docs.userId})
        } catch (error) {
            console.log(`Error in Deleting refresh token :${error.message}`)
        }
    }
}

// module.exports=new TokenService();
export default new TokenService();