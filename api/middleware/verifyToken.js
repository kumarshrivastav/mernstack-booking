// const TokenService = require("../service/TokenService");
import TokenService from "../service/TokenService.js"
import ErrorHandler from "../utils/error.handler.js"
function verifyToken(req,res,next){
   const {accessToken}=req.cookies
    if(!accessToken){
        return next(ErrorHandler(401,'Unauthorized'))
    }
    try {
        const payload=TokenService.verifyAccessToken(accessToken)
        req.userId=payload._id;
        next()
    } catch (error) {
        return next(ErrorHandler(401,'Unauthorized'))
    }
}
export default verifyToken