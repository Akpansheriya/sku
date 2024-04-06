const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin")


router.post("/register", adminController.register);
router.post("/login",adminController.login );
router.post("/logout",adminController.logout );

module.exports = router;