const router = require("express").Router();
const controller = require("../controllers/vendorController")

router.patch("/imageUpdate/:resId", controller.updateImage)

module.exports = router