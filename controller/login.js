const myError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new myError("Имэйл болон нууц үг оруулна уу!!", 400);
  }
  console.log(email, password);
  // find User
  const hospital = await req.db.hospital.findOne({ where: { email: email } });

  if (!hospital) {
    throw new myError("Имэйл эсвэл нууц үг буруу байна!!", 401);
  }

  const success = await hospital.checkPassword(password);

  if (!success) {
    throw new myError("Имэйл эсвэл нууц үг буруу байна!!", 401);
  }

  res.status(200).json({
    success: true,
    token: hospital.getJsonWebToken(),
  });
});
