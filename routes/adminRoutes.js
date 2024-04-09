const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminmiddleware = require('../middlewares/adminauth')
const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../public/images"));
    },
    filename: (req, file, cb) => {
      const name = Date.now() + "-" + file.originalname;
      cb(null, name);
    },
  });
  
  const upload = multer({ storage: storage });
router.get('/',adminmiddleware.checkAdminAuth,adminController.getAdminDash);
router.get("/login",adminmiddleware.reToAdminDash,adminController.getAdminLogin)
router.post("/adminlogin",adminController.adminLogin);
router.get('/delete/:id', adminController.deleteUser);
router.get("/update/:id",adminController.getUpdate)
router.post("/userupdate/:id",upload.single('image'),adminController.updateUser)
router.post("/userupload",upload.single('image'),adminController.addNewUser)
router.get("/users",adminmiddleware.checkAdminAuth,adminController.search)
router.get("/logout",adminController.adminLogout)

module.exports = router;