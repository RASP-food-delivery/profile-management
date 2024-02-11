const router = require("express").Router();
const controller = require("../controllers/adminController")

router.route("/:resId")
.patch(controller.verifyVendor)
.delete(controller.deleteVendor);

router.get("/unverified",controller.displayUnverified)
router.get("/verified", controller.displayVerified)

module.exports = router