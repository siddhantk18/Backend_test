const mongoose=require('mongoose')
const cardSchema = new mongoose.Schema({

    cardNumber :String ,                       //Auto_increment e.g: C001
    cardType :String,                          //[REGULAR/SPECIAL]
    customerName :{type:String},
    status :{type:String,default:"ACTIVE"},    //[ACTIVE/INACTIVE] 
    vision :String,
    customerID :{type:String,ref:"customer"}   //Reference from customer table

},{timestamps:true})

module.exports=mongoose.model('card',cardSchema)