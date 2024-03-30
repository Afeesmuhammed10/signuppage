const Admin = require('../models/adminSchema')


const getAdminDash = (req,res) =>{
    res.render("admin/adminDash")
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





module.exports = {
    getAdminDash,
    getAdminLogin,
    adminLogin
}