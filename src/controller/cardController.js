const cardModel = require("../Model/cardModel")
const customerModel = require('../Model/customerModel')



const createCard = async function (req,res){
    try{
     let data=req.body
     if(Object.keys(data).length==0 ) return res.status(400).send({status:false,message:"Request body doesn't be empty"})

     let {cardType,vision,customerID} = data

     if(!cardType) return res.status(400).send({status:false,message:"cardType is Mandatory"})
     if(cardType!="REGULAR" && cardType!="SPECIAL")  return res.status(400).send({status:false,message:"carType is only be 'REGULAR/SPECIAL'"})

     if(!vision) return res.status(400).send({status:false,message:"vision is Mandatory"})

     if(!customerID) return res.status(400).send({status:false,message:"customerID is Mandatory"})
     let custData= await customerModel.findOne({customerID})
     if(!custData) return res.status(400).send({status:false,message:"customerID is not present in Customer Database"})

     let fullname=custData.firstName+" "+custData.lastName
     data.customerName=fullname

     let cardlen= await cardModel.find()
     data.cardNumber=`C00${++cardlen.length}`

     let cardl= await cardModel.findOne({customerID})
     if(cardl) return res.status(400).send({status:false,message:"Card is already created with this customerID"})

     let creCard = await cardModel.create(data)
     return res.status(201).send({status:true,message:"Success",data:creCard})

    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}


const getcard= async(req,res)=>{
    try{
        let data = await cardModel.find()
        res.status(200).send({status:true,data:data})

    }catch(err){
        return res.status(500).send({send:false,message:err.message})
    }
}

module.exports={getcard,createCard}