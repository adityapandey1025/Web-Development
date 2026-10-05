import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js'

const connectDB=async ()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("DB Connection Succesfully to host ",connectionInstance.connection.host);
    } catch (error) {
        console.error("DB Connection failed ",error);
        console.error("DB Connection failed message",error.message);
        process.exit(1)
    }
}

export default connectDB;