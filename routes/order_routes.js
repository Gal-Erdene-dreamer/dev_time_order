const express = require("express");
const router = express.Router();
const { authorize } = require("../middleware/protect");
const { auth } = require("../middleware/authMiddleware");

const {
  getOrders,
  getLocation,
  createOrder,
  getOrder,
  updateOrder,
  updateLocation,
  deleteOrder,
} = require("../controller/order_controller");

router.use(auth);
// // API category
router.route("/").get(getOrders).post(createOrder);

router.route("/:id").get(getOrder).put(updateOrder).delete(deleteOrder);

router.route("/location/:id").get(getLocation).put(updateLocation);

module.exports = router;
