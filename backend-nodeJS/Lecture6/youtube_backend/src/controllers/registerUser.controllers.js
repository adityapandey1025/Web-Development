import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiErrors} from '../utils/ApiErrors.js'
import {User} from '../models/user.models.js'
import {uploadFileOnCloudinary} from '../utils/cloudinary.js'
import {ApiResponse} from '../utils/ApiResponse.js'


const registerUser=asyncHandler(async (req,res)=>{
    // get User details from frontend
    // validation of  user details -> non empty
    // check if User already exixt (username or email)
    // chec for images ,check for avatar
    // upload them on cloudinary,avatar
    // create user object -> create entry in db
    // remove password and refrsh token from mongodb response
    // check for user Creation
    // return res;

    // Step 1
    const {username, fullName , email ,password}=req.body;
    console.log(`username is ${username} and fullName is ${fullName}`);


    //step 2

    // if(username===""){
    //     throw new apiError(400,"username is required");
    // }

    if([username,fullName,email,password].some((field)=>{
        return field?.trim()=="";
    })){
        throw new ApiErrors(400,"All fields are required");
    }

    // step 3
    const existedUser=await User.findOne({
        $or : [{username},{email}]
    })

    if(existedUser){
        throw new ApiErrors(409,"user with same email or username exists");
    }


    const avatarLocalPath=req.files?.avatar[0]?.path;

    const coverImageLocalPath=req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiErrors(400,"Avatar file is required");
    }

    const avatar=await uploadFileOnCloudinary(avatarLocalPath);


    const coverImage=await uploadFileOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new Errors(500,"Uploadation error on server");
    }

    const user=User.create({
        username:username.toLowerCase(),
        fullName,
        email,
        avatar:avatar.secure_url,
        password,
        coverImage : coverImage?.url || "",

    })

    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiErrors(500,"Something went wrong while registering User");
    }

    return res.status(200).json(
        new ApiResponse(200,createdUser,"User registeration Successfully")
    )


})

export {registerUser};