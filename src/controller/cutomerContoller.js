const customerModel = require('../Model/customerModel')
const { v4: uuidv4 } = require('uuid');



const createCustomer = async (req,res)=>{
        try{
            let bodydata = req.body
            bodydata.customerID=uuidv4()
       
    let data= await customerModel.create(bodydata)
    res.status(200).send({status:true,data:data})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}


const getCustomer = async(req,res)=>{
    try{
        let data = await customerModel.find({status:"Active"})
        if(!data) return res.status(404).send({status:false,message:"No data found"})
        res.status(200).send({status:true,data:data})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}


const deleteCustomer= async(req,res)=>{

    try{
        let id = req.body.id
        let ID = req.params.Id
        if(!isIdValid(ID)) return res.status(400).send({status:false,message:"Invalid CustomerId in path params"})
        let data = await customerModel.deleteOne({customerID:id})
        return res.status(200).send({status:true,message:"Successfully Deleted"})

    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}



// This code when we have to make only api 
// const createCustomer = async (req,res)=>{
//     try{
//         let bodydata = req.body
//         if(bodydata.customerId)
//         {
//             await customerModel.deleteOne({customerID:bodydata.customerId})
//         return res.status(200).send({status:true,message:"Successfully Deleted"})

//         }
//         bodydata.customerID=uuidv4()
       
//      await customerModel.create(bodydata)
//      let data = await customerModel.find({status:"Active"})
//    // console.log(data)
//     res.status(200).send({status:true,data:data})
//     }catch(err){
//         return res.status(500).send({status:false,message:err.message})
//     }

// }
module.exports={createCustomer,getCustomer,deleteCustomer}

