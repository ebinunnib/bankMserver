//server creation
//express
const cors= require('cors')
//import env file
require('dotenv').config()
//1.import 

const express = require('express')

const router = require('./routes/router')
//2-create server using express
const server=express()

//integrate frontend
 server.use(cors())
// to convert jason to javascript
server.use(express.json())

//routerset
server.use(router)


//import connection js file
require('./db/connection')


//3 runserver


//port
const port=5001 || process.env.port
server.listen(port,()=>{
console.log(`server started ${port}`);

})
//api call resolve POST methord

// server.post('/register',(req,res)=>{

//     res.send("post methord working")
// })

// server.post('/login',(req,res)=>{
//     console.log(req.body.acno);
//     console.log(req.body.psw);

//     res.send("login worked")
// })
// server.get('/getexc',(req,res)=>{

//     res.send("get working....")
// })