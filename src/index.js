const express= require('express')
const { default: mongoose, connect } = require('mongoose')
const route = require('./route/route')
const app = express()
app.use(express.json())

mongoose.set('strictQuery', true)
mongoose.connect("mongodb://127.0.0.1:27017/BackendTest",{useNewUrlParser:true})
.then(()=>console.log("MongoDB is Connected"))
.catch((err)=>console.log(err))

app.use("/",route)
app.listen(3000,function(){
    console.log("Express is running on Port 3000")
})