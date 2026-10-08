import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";



const videoSchema=new mongoose.Schema(
    {
    videoFile:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        default:"Welcome , to my YouTube Channer",
        trim:true
    },
    views:{
        type:Number,
        default:0
    },
    duration:{
        type:Number,
    },
    isPublished:{
        type:Boolean,
        default:true
    },

    // Storing owner of video 
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

    },
    {
        timestamps:true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video=mongoose.model("Video",videoSchema);