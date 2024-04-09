    const namePattern = /^[A-Za-z]+( [A-Za-z]+)*$/;
    const emailPattern = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    const phoneNoPattern = /^[1-9][0-9]{9}$/;
    const passwordPattern = /^(?!.*\s).{8,16}$/;
    const User = require('../models/userSchema')

const checkAdminAuth = (req,res,next) =>{
    if(!req.session.adminId){
        res.redirect('/admin/login')
    }else{
        next()
    }
}

const reToAdminDash = (req,res,next) =>{
    if(req.session.adminId){
        res.redirect("/admin")
    }else{
        next()
    }
}

const formValidation = async (req,res)=>{
    const {email,password} = req.body
    
    const checkEmail = await User.findOne(
        {email:{
            $regex: emailPattern
        }}
    )

    if(checkEmail){
        console.log("true")
    }else{
        console.log("false")
    }
}

module.exports = {
    checkAdminAuth,
    reToAdminDash,
    formValidation
}