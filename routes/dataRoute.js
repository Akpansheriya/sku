const express = require("express");
const router = express.Router();
const upload = require('../middleware/image')
const dataController = require("../controllers/data")
const secure = require("../middleware/secure")

router.post("/data",upload.single("image") ,dataController.addData);
router.get("/data",secure() ,dataController.getData );


module.exports = router;