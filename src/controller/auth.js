 const customerModel = require("../Model/customerModel")
const jwt= require('jsonwebtoken')

const login = async function (req,res){
    try{
        let data=req.body
        if(Object.keys(data).length==0 || Object.keys(data).length<2 ) return res.status(400).send({status:false,message:"Please provide all valid fields in Request body"})
        let {emailID,customerID} = data
 let customerData= await customerModel.findOne({emailID,customerID})
        if(!customerData) return res.status(404).send({status:false,message:"the email or customerID is invalid"})

       let token= jwt.sign({id:customerData._id},"Banking_Data",{expiresIn:"1h"})
       return res.status(200).send({status:true,message:"Token",token:token})
        

    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

const authentication = async function (req,res,next){
    try{

        let token =req.headers.authorization 
        if(!token) return res.status(400).send({status:false,message:"token is mandatory"})
        token=token.slice(7)
       
        jwt.verify(token,"Banking_Data",function (err,decoded){
            if(err){
                return res.status(401).send({status:false,message:"Unauthenticated Customer"})
            }
            req.id=decoded.id
            next()
        })


    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

const authorization= async function (req,res,next){
    try{

        let id=req.params.Id
        if(id!=req.id)  return res.status(403).send({status:false,message:"Unauthorized Customer"})
        
        next()
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

module.exports={login,authentication,authorization}