

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

module.exports = {
    checkAdminAuth,
    reToAdminDash
}