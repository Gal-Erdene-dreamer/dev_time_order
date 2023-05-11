const express = require("express");
const router = express.Router();
// const { protect, authorize } = require("../middleware/protect");
const { auth } = require("../middleware/authMiddleware");

const { getOrders, createOrder, deleteOrder } = require("../controller/order");

// // API category
router.route("/").get(auth, getOrders).post(auth, createOrder);

router.route("/:id").delete(auth, deleteOrder);

module.exports = router;
