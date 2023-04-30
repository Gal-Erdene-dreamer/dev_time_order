const express = require("express");

const { protect, authorize } = require("../middleware/protect");
const { auth } = require("../middleware/authMiddleware");
const {
  getHospitals,
  getHospital,
  createHospital,
} = require("../controller/hospital");

const router = express.Router();

// router.use(protect);

// CRUD
router.route("/").get(getHospitals).post(createHospital);

router.route("/:id").get(getHospital);

module.exports = router;
