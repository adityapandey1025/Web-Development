import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { ApiErrors } from "../utils/ApiErrors.js";



export const verifyJWT=asyncHandler(async (req,res,next)=>{
    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
    
        if(!token){
            throw new ApiErrors(401,"Unauthorized User ");
        }
    
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    
        const user=await User.findById(decodedToken.id).select("-password -refreshToken");
    
        if(!user){
            throw new ApiErrors(401,"Invalid access Token");
        }
    
        req.user=user;
        next();
    } catch (error) {
        throw new ApiErrors(401,error.message || "Invalid access token");
    }
})