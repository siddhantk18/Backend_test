const mongoose=require('mongoose')


const customerModel = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    mobileNumber:{type:String,max:10},
    DOB:{type:Date},
    emailID:{type:String},
    address:{type:String},
    customerID:{type:String},
    status:{type:String}
})

module.exports=mongoose.model("customer",customerModel)