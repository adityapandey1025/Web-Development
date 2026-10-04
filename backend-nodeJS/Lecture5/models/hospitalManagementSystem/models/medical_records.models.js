import mongoose from 'mongoose'

const medicalRecordSchema=new mongoose.Schema({
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient"
    }
},{timestamps:true});

export const medicalRecord=mongoose.model("medicalRecord",medicalRecordSchema);