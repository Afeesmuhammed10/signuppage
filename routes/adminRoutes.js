const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminmiddleware = require('../middlewares/adminauth')

router.get('/',adminmiddleware.checkAdminAuth,adminController.getAdminDash);
router.get("/login",adminmiddleware.reToAdminDash,adminController.getAdminLogin)
router.post("/adminlogin",adminController.adminLogin)

module.exports = router;