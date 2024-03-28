const mongoose = require('mongoose')


const connection = ()=>{
    try{
        mongoose.connect("mongodb://localhost:27017/ecommerce")
        console.log("mongodb connected successfully...")
    }catch(err){
        console.log(err)
    }
}

module.exports={
    connection
}