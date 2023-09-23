const mongoose=require('mongoose')

mongoose.connect(process.env.BASE_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("______________mongodbatlass connected______________");
}).catch(()=>{
    console.log("_____________mdb not connected_____________");
})