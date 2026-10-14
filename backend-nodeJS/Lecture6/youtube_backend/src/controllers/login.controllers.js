import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiErrors} from "../utils/ApiErrors.js"
import {User} from "../models/user.models.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken=async(userId)=>{
    try {
        const user=await User.findById(userId);
        if (!user) {
            throw new ApiErrors(404, "User not found");
        }
        const accessToken=user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();

        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave:false});

        return {accessToken,refreshToken};
    } catch (error) {
        throw new ApiErrors("Something went wrong while creating access and refresh Token");
    }
}


const loginUser=asyncHandler(async (req,res)=>{
    // fetch data from frontend from req.body
    // username or email
    // do validation on Incoming data , whether they contains required fields or not
    // check user exists or not
    // password check
    // generate access and refresh Token
    // send cookie


    const {username , email, password}=req.body;

    console.log(req.body);

    if((!username && !email) ){
        throw new ApiErrors(400,"username or email is required");
    }

    if(!password){
        throw new ApiErrors(400,"Password is required");
    }

    const user=await User.findOne({
        $or : [{username},{email}]
    })

    if(!user){
        throw new ApiErrors(400,"user doesn't exists");
    }

    const isValidUser=await user.isPasswordCorrect(password);

    if(!isValidUser){
        throw new ApiErrors(401,"Incorrect Credential");
    }

    const {refreshToken , accessToken}=await generateAccessAndRefreshToken(user._id);

    const loggedInUser=await User.findById(user._id).select("-password -refreshToken");

    const options={
        httpOnly : true,
        secure :true
    }

    return res
            .status(200)
            .cookie("refreshToken",refreshToken,options)
            .cookie("accessToken",accessToken,options)
            .json(
                new ApiResponse(
                    200,
                    {
                        user:loggedInUser,
                        accessToken,
                        refreshToken
                    },
                    "User Logged In Successfully"
                )
            )

    
})


const loggedOutUser=asyncHandler(async (req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set : {refreshToken : undefined}
        },
        {
            new : true
        }
    )

    const option ={
        httpOnly:true,
        secure:true
    }

    return res
            .status(200)
            .clearCookie("refreshToken",option)
            .clearCookie("accessToken",option)
            .json(
                new ApiResponse(200,
                    {},
                    "User successfully logoout"
                )
            )
})

const refreshAccessToken=asyncHandler(async (req,res)=>{
    const incomingRefreshToken=req.cookie?.refreshToken || req.body?.refreshToken;

    if(!incomingRefreshToken){
        throw new ApiErrors(401,"Unauthorised request");
    }

    try {
        const decode=await jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user=await User.findById(decode.id);
    
        if(!user){
            throw new ApiErrors(401,"Invalid refresh token");
        }
    
    
        if(incomingRefreshToken !== user.refreshToken){
            throw new ApiErrors(401,"Refresh token is expired or used ")
        }
    
        const options={
            httpOnly:true,
            secure:true
        }
    
        const {newRefreshToken,accessToken}=await generateAccessAndRefreshToken(user._id);
    
        const loggedInUser=await User.findById(user._id);
    
        return res
                .status(200)
                .cookie("refreshToken",newRefreshToken,options)
                .cookie("accessToken",accessToken,options)
                .json(
                    new ApiResponse(
                        200,
                        {
                            user:loggedInUser,
                            newRefreshToken,
                            accessToken
                        },
                        "Welcome back "
    
                    )
                )
    } catch (error) {
        throw new ApiErrors(401,error.message || "Invalid refresh token");
    }
})


export {loginUser,loggedOutUser,refreshAccessToken}