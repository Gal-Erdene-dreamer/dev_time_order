const express = require("express");
const router = express.Router();

const {
  register,
  employeeRegister,
} = require("../controller/register_controller");

router.route("/").post(register);
router.route("/employee").post(employeeRegister);
// router.route('/confirmCode').post(confirmCode);
// router.route('/setPassword').post(protect , setPassword);

module.exports = router;
