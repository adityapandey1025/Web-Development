import mongoose from 'mongoose'

const hospitalSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    addressLine1:{
        type:String,
        required:true
    },
    addressLine2:{
        type:String,
    },
    pinCode:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    specialisedIn:[{
        type:String
    }],
    //
    // specialisedIn:[String]

    ownership:{
        type:String,
        enum:["PUBLIC","PRIVATE","GOVERNMENT"],
        default:"GOVERNMENT"
    }
},{timestamps:true});

export const Hospital=mongoose.model("Hospital",hospitalSchema);