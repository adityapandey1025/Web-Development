import mongoose from 'mongoose'

const doctorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    qualiications:{
        type:String,
        required:true
    },
    ExperienceInYears:{
        type:Number,
        default:0
    },
    workInHospital:{
        type:[
            {
            worksIn:{type:mongoose.Schema.Types.ObjectId,
             ref:"Hospital"
            },
            workHrs:Number
        }
        ]
    }
},{timestamps:true});

export const Doctor=mongoose.model("Doctor",doctorSchema);