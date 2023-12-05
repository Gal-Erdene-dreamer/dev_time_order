const MyError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new MyError("Имэйл болон нууц үг оруулна уу!!", 400);
  }
  console.log(email, password);
  // find User
  const user = await req.db.user.findOne({ where: { email: email } });

  if (!user) {
    throw new MyError("Имэйл эсвэл нууц үг буруу байна!!", 401);
  }

  const success = await user.checkPassword(password);

  if (!success) {
    throw new MyError("Имэйл эсвэл нууц үг буруу байна!!", 401);
  }

  res.status(200).json({
    success: true,
    user: user,
    token: user.getJsonWebToken(),
  });
});

exports.employeeLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new MyError("Имэйл болон нууц үг оруулна уу!!", 400);
  }
  console.log(email, password);
  const employee = await req.db.employee.findOne({
    where: { email: email },
  });

  if (!employee) {
    throw new MyError("Имэйл эсвэл нууц үг буруу байна!!", 401);
  }

  const success = await employee.checkPassword(password);

  if (!success) {
    throw new MyError("Имэйл эсвэл нууц үг буруу байна!!", 401);
  }

  res.status(200).json({
    success: true,
    user: user,
    token: employee.getJsonWebToken(),
  });
});
