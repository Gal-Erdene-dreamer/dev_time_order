const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/protect");
const {
  getHospitals,
  getHospital,
  createHospital,
  updateHospital,
  deleteHospital,
} = require("../controller/hospital_controller");

router.use(auth);

// CRUD
router.route("/").get(getHospitals).post(createHospital);

router
  .route("/:id")
  .get(getHospital)
  .put(updateHospital)
  .delete(deleteHospital);

module.exports = router;
