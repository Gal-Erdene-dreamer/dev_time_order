const express = require("express");
const router = express.Router();

const { login, employeeLogin } = require("../controller/login_controller");

router.route("/").post(login);
router.route("/employee").post(employeeLogin);

module.exports = router;
