const express = require("express");
const router = express.Router();
// const { protect, authorize } = require("../middleware/protect");
const { auth } = require("../middleware/authMiddleware");

const {
  getCustomers,
  getCustomer,
  deleteCustomer,
  updateCustomer,
  createCustomer,
} = require("../controller/customer");

// API category
router.route("/").get(getCustomers).post(createCustomer);

// router
//   .route("/:id")
//   .get(getCustomer)
//   .put(updateCustomer)
//   .delete(deleteCustomer);

module.exports = router;
