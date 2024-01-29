const controller = require("../controllers/itemController")
const auth = require("../auth");

const router = require("express").Router();

router.route("/items")

.get(controller.getItems)
.post(controller.addItem)
.delete(controller.deleteAll);

router.route("/items/:resId")

.get(controller.showRestaurant)
.delete(controller.deleteRestaurantItems);

router.route("/items/:resId/:name")

.delete(controller.deleteSingle)
.put(controller.updateItem);

module.exports = router
