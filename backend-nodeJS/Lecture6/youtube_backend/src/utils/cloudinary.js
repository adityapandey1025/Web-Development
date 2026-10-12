import {v2 as cloudinary} from 'cloudinary'
import { config } from 'dotenv'
import fs from "fs/promises"

config({path:"./.env"})

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadFileOnCloudinary=async (localFilePath)=>{
    try {
        const res=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        console.log("File is uploaded on Cloudinary ",res.url);
        // fs.unlinkSync(localFilePath);
        return res;
    } catch (error) {
        // fs.unlinkSync(localFilePath);
        return null;
    }
    finally{
        await fs.unlink(localFilePath).catch((error) => {
      if (error.code !== "ENOENT") {
        console.error("File cleanup error:", error.message);
      }
    });
        ;
    }
}

export {uploadFileOnCloudinary}