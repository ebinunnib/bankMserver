//craete model
//import mongoose
const mongoose=require('mongoose')

//schema 
//::feilds and values of model(collection)
const usersSchema =new mongoose.Schema({
    acno:Number,
    uname:String,
    psw:String,
    balance:Number,
    transaction:[]
})
//model same us collection name in mongo
const users=new mongoose.model("users",usersSchema)

//export model -to import in another files
module.exports=users