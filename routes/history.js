const express = require("express");
const router = express.Router();
// const { protect, authorize } = require("../middleware/protect");
const { auth } = require("../middleware/authMiddleware");

const {
  getHistories,
  getHistory,
  createHistory,
  updateHistory,
  deletehistory,
} = require("../controller/history");

// API category
router.route("/").get(getHistories).post(createHistory);

router.route("/:id").get(getHistory).put(updateHistory).delete(deletehistory);

module.exports = router;
