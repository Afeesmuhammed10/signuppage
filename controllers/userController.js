const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const multer = require('multer')


//get home page
const getHome = async (req,res) =>{
    console.log(req.session.userId)
    const userdata = await User.findById(req.session.userId)
    console.log(userdata)
    res.render('user/home',{user:userdata})
   
}


//get user login
const getLogin = (req,res)=>{
    res.render('user/login')
}
//sign up
const signup = async (req,res)=>{
    const {name,email,phone,password} = req.body
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await User.create({
        name:name,
        email:email,
        phone:phone,
        password:hashedPassword
    })
    console.log(user)
    res.redirect('/')
}
//userlogin
const userLogin = async (req,res)=>{
    const {email,password} = req.body
    const userdata = await User.findOne({email:email});

    if(userdata){
        console.log(userdata)
       const passwordmatch = await bcrypt.compare(password,userdata.password)
       console.log(passwordmatch)
       
       if(passwordmatch){
            req.session.userId = userdata._id;
            res.redirect("/")
            console.log("user login success")
       }else{
        res.render('user/login',{err:"invalid email or password"})
        console.log("login error")
       }
    }

}


//logout

const userLogout = (req,res)=>{
    req.session.destroy();
    console.log("user logout suucessfully")
    res.redirect('/login')
}

const userDataUpload = async(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    const {name,email,phone} = req.body
   const userdata = await User.findByIdAndUpdate(
    {_id:req.session.userId},
    {
        $set:{
            name:name,
            email:email,
            phone:phone,
            image:req.file.filename
        }
    }
   )
    console.log(userdata)
   res.redirect('/')
    
}






module.exports ={
    getLogin,
    signup,
    userLogin,
    getHome,
    userLogout,
    userDataUpload
}