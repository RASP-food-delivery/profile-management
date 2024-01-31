const router = require("express").Router();
const controller = require("../controllers/vendorController")

router.patch("/imageUpdate/:resId", controller.updateImage)

router.route("/:resId")
.get(controller.VendorInfo)

module.exports = router