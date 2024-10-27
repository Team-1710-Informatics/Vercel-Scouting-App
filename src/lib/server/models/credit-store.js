import mongoose from 'mongoose';
const { Schema } = mongoose;

const storeItems = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true,
    },
    stock:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    color:String,
    other:{}
});

const receipts = new Schema({
    user:{
        type:String,
        required:true
    },
    item:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    }
})

export const StoreModel = mongoose.model("product", storeItems);
export const ReceiptModel = mongoose.model("receipt", receipts);