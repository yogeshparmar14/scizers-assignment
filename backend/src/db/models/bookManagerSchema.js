const mongoose = require("mongoose");
const date = new Date().getTime();
const bookManagerSchema = new mongoose.Schema({
    contactName:{type:String,required:true},
    mobileNumber:{type:Number,required:true},
    createdAt:{type:String,default:date},
    updatedAt:{type:Number},
})

const userModel = mongoose.model("contactdetail",bookManagerSchema)

module.exports = userModel;