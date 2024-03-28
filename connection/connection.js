const mongoose = require('mongoose')


const connection = ()=>{
    try{
        mongoose.connect("mongodb+srv://afees:sampleauth@cluster0.oudsdek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("mongodb connected successfully...")
    }catch(err){
        console.log(err)
    }
}

module.exports={
    connection
}