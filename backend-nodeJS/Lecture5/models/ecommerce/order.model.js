import mongoose from "mongoose"

const orderItemSchema=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:Number,
        required:true,
        default:0
    }
})

const orderSchema=new mongoose.Schema({
    orderPrice:{
        type:Number,
        required:true
    },
    customerName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    orderItems:[orderItemSchema],
    address:String,
    status:{
        type:String,
        enum:["PENDING","CANCELLED","DELIVERED"],
        default:"PENDING"
    }


},{timestamps:true})

export const Order=mongoose.model("Order",orderSchema);