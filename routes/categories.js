const express = require("express");
const router = express.Router();
// const { protect, authorize } = require("../middleware/protect");
const { auth } = require("../middleware/authMiddleware");

const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/categories");

// API category
router.route("/").get(auth, getAllCategories).post(auth, createCategory);

router
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
