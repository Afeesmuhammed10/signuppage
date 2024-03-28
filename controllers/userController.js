const User = require('../models/userSchema')
const bcrypt = require('bcrypt')





//get home page

const getHome = (req,res) =>{
    res.render('user/home')
}


//get user login
const getLogin = (req,res)=>{
    res.render('user/login')
}
//sign up
const signup = async (req,res)=>{
    const {name,email,password} = req.body
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await User.create({
        name:name,
        email:email,
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
            req.session.id = userdata._id;
            res.redirect('/home')
            console.log("login success")
       }else{
        res.render('user/login',{err:"invalid email or password"})
        console.log("login error")
       }
    }

}











module.exports ={
    getLogin,
    signup,
    userLogin,
    getHome
}