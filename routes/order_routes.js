const express = require("express");
const router = express.Router();
const { authorize } = require("../middleware/protect");
const { auth } = require("../middleware/authMiddleware");

const {
  getOrders,
  getLocation,
  createOrder,
  getOrder,
  getMyOrders,
  updateOrder,
  updateLocation,
  deleteOrder,
} = require("../controller/order_controller");

// // API category
router.route("/").get(getOrders).post(createOrder);
router.route("/location/:id").get(getLocation).put(updateLocation);

router.use(auth).route("/my_order").get(getMyOrders);
router.route("/:id").get(getOrder).put(updateOrder).delete(deleteOrder);

module.exports = router;
