const express=require('express')
const router = express.Router()
const customerController =require('../controller/cutomerContoller')
const cardController= require('../controller/cardController')
const authController= require('../controller/auth')

router.post("/createCustomer",customerController.createCustomer)
router.get("/getCustomer",customerController.getCustomer)
router.delete("/deleteCustomer/:Id",authController.authentication,authController.authorization,customerController.deleteCustomer)
router.post("/login",authController.login)

router.post("/createCard",cardController.createCard)
router.get("/getCard",cardController.getcard)

module.exports=router