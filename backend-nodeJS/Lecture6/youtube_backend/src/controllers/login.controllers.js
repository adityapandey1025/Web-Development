import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiErrors} from "../utils/ApiErrors.js"
import {User} from "../models/user.models.js"
import jwt from "jsonwebtoken"
import { uploadFileOnCloudinary } from "../utils/cloudinary.js"
import mongoose from "mongoose"

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
        throw new ApiErrors(500,"Something went wrong while creating access and refresh Token");
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
    const incomingRefreshToken=req.cookies?.refreshToken || req.body?.refreshToken;

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
    
        const {refreshToken: newRefreshToken,accessToken}=await generateAccessAndRefreshToken(user._id);
    
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


const changePassword=asyncHandler(async (req,res)=>{
    const {oldPassword,newPassword}=req.body;

    const user=await User.findById(req.user?._id);

    const isCororectPassword=await user.isPasswordCorrect(oldPassword);

    if(!isCororectPassword){
        throw new ApiErrors(400,"Invalid Password");
    }

    user.password=newPassword;

    await user.save({validateBeforeSave:false});

    return res.status(200)
              .json(
                new ApiResponse(
                200,
                {},
                "Password changes successfully"
                ))
})


const getCurrentUser=asyncHandler(async (req,res)=>{
    return res
            .status(200)
            .json(
                new ApiResponse(200,req.user,"User details fetched Successfully")
            )
})


const updateAccountDetails=asyncHandler(async (req,res)=>{
    const {fullName,email}=req.body;

    if(! fullName || !email){
        return new ApiErrors(400,"All fields are required");
    }

    const user=await User.findByIdAndUpdate(
        req.user._id,
        {
            $set : {
                fullName,
                email:email
            }
        },
        {
            new : true
        }
    ).select("-password -refreshToken")


    return res
            .status(200)
            .json(
                new ApiResponse(200,user,"Account details updated successfully")
            )
})


const updateAvatar=asyncHandler(async (req,res)=>{
    const avatarLocalPath=req.file?.path;

    if(!avatarLocalPath){
        throw new ApiErrors(400,"Avatar file is missing")
    }

    const avatar=await uploadFileOnCloudinary(avatarLocalPath);

    if(!avatar.url){
         throw new ApiErrors(500,"avatar Uploadation error")
    }
     
    const user=await User.findByIdAndUpdate(
        req.user._id,
        {
            $set : {avatar:avatar.url}
        },
        {
            new : true
        }
    ).select("-password")

    return res
            .status(200)
            .json(
                new ApiResponse(200,user,"avatar image is updated successfully")
            )
})

const updateCoverImage=asyncHandler(async (req,res)=>{
    const coverImageLocalPath=req.file?.path;

    if(!coverImageLocalPath){
        throw new ApiErrors(400,"Cover Image file is missing")
    }

    const coverImage=await uploadFileOnCloudinary(coverImageLocalPath);

    if(!coverImage.url){
         throw new ApiErrors(500,"coverImage Uploadation error")
    }
     
    const user=await User.findByIdAndUpdate(
        req.user._id,
        {
            $set : {coverImage:coverImage.url}
        },
        {
            new : true
        }
    ).select("-password")

    return res
            .status(200)
            .json(
                new ApiResponse(200,user,"cover image is updated successfully")
            )
})


const getUserChannelProfile=asyncHandler(async (req,res)=>{
    const {username}=req.params;

    if(! username?.trim()){
        throw new ApiErrors(200,"Username is missing");
    }

    const channel=await User.aggregate([
        {
            $match : {
                username : username
            }
        },
        {
            $lookup :{
                from : "subscriptions",
                localField : "_id",
                foreignField : "channel",
                as : "subscribers"
            }
        },
        {
            $lookup : {
                from : "subscriptions",
                localField : "_id",
                foreignField : "subscriber",
                as : "subscribedTo"
            }
        },
        {
            $addFields : {
                subscriberCount : {
                    $size : "$subscribers"
                },
                subscribedToCount : {$size : "$subscribedTo"},
                // isSubscribed : {
                //     $cond : {
                //         if : {$in : [req.user._id ,"$subscribers.subsriber"]},
                //         then : true,
                //         else : false
                //     }
                // }
                isSubscribed : {
                    $in : [req.user._id , "$subscribers.subscriber"]
                }
            }
        },
        {
            $project : {
                _id : 0,
                username : 1,
                fullName :1 ,
                avatar : 1,
                coverImage :1 ,
                subscribedToCount :1 ,
                subscriberCount : 1,
                isSubscribed :1
            }
        }
    ])

    if(!channel?.length){
        throw new ApiErrors(400,"Channel doesn't exists");
    }

    return res.
            status(200)
            .json(
                new ApiResponse(200,
                    channel[0],
                    "Channel Profile fetched Successfully"
                )
            )
})


const getWatchHistory=asyncHandler(async (req,res)=>{
    const user=await User.aggregate([
        {
            $match : {
                _id : new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup : {
                from : "videos",
                localField : "watchHistory",
                foreignField : "_id",
                as : "watchHistory",

                pipeline : [
                    {
                        $lookup : {
                            from : "users",
                            localField : "owner",
                            foreignField : "_id",
                            as : "owner",

                            pipeline : [
                                {
                                $project : {
                                    _id : 0,
                                    fullName : 1,
                                    username : 1,
                                    avatar : 1,

                                }
                            }
                            ]
                        }
                    },
                    {
                        $addFields : {
                            "first" : "$owner"
                        }
                    }
                ]
            }
        }
    ])

    return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    user[0].watchHistory,
                    "video history fetched successfully"
                )
            )
})

export {loginUser,loggedOutUser,refreshAccessToken,changePassword,getCurrentUser,updateAccountDetails,updateAvatar,updateCoverImage,getUserChannelProfile,getWatchHistory}