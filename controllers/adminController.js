const Admin = require('../models/adminSchema')
const User = require('../models/userSchema')
const bcrypt = require('bcrypt')


const getAdminDash = async(req,res) =>{
    const usersdata =await User.find({})
    console.log(typeof(usersdata))
    res.render("admin/adminDash",{users : usersdata})
}

const getAdminLogin = async(req,res)=>{
    res.render("admin/adminlogin")
    
  
}

const adminLogin = async (req,res)=>{
    const {email,password} = req.body

    const admindata = await Admin.findOne({email:email})
    console.log(admindata)
    if(admindata){
        const adminPassword = await Admin.findOne({password:password})
        if(adminPassword){
            req.session.adminId = admindata._id 
            console.log(admindata)
            res.redirect('/admin')
        }
    }
}

const deleteUser= async(req,res) =>{
    const userId =req.params.id
        console.log(userId)
    const deleteUser = await User.findByIdAndDelete(userId)

    if(deleteUser){
        console.log(`user : ${userId} deleted successfully...`);
        req.session.userId = null 
        res.redirect('/admin')
    }
}

const getUpdate = async (req,res) =>{
   const userId = req.params.id
    const userdata = await User.findById(userId)
    res.render("admin/updateuser",{user:userdata})
}


const updateUser = async (req,res)=>{
    const userId = req.params.id
    console.log(req.params.id)
    const {name,email,phone} = req.body
    console.log(req.body)
    console.log(req.file)

    if (req.file) {
        image = req.file.filename;
    } 

    const userUpdate = await User.findByIdAndUpdate(
        {_id:userId},
        {
            $set:{
                name:name,
                email:email,
                phone:phone,
                image:image
            }
        }
    )

    console.log(userUpdate)
    res.redirect("/admin")
    console.log(req.params.id)
}

const addNewUser = async(req,res)=>{
    const {name,email,phone,password} = req.body
    const hashedPassword = await bcrypt.hash(password,10)
    if (req.file) {
        image = req.file.filename;
    } else {
        image = "unknown(2jpg.jpg";
    }
    
    const newUser = await User.create({
        name: name,
        email: email,
        phone: phone,
        password: hashedPassword,
        image: image
    });
    
    console.log(newUser)
    res.redirect('/admin')
}


const search = async (req,res)=>{
   
    console.log(req.query.data)
 const searchData =req.query.data

    const searchResult =await  User.find(
        {
            $or:[
                {
                    name:{$regex:new RegExp(searchData,'i') }
                },
                {
                    phone:{$regex:new RegExp(searchData,'i') }
                }
            ]
        }
    ) 

    console.log(searchResult)
    res.render("admin/adminDash", { users: searchResult, searchdata: req.query.data });
}

const adminLogout = (req,res) =>{
    delete req.session.adminId
    console.log("admin logout successfully")
    res.redirect("/admin/login")
}





module.exports = {
    getAdminDash,
    getAdminLogin,
    adminLogin,
    deleteUser,
    getUpdate,
    updateUser,
    addNewUser,
    search,
    adminLogout
}