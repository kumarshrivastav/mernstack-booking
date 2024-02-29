
import jwt from "jsonwebtoken"
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
}
export default new TokenService();