const myError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");
const { where } = require("sequelize");
const bcrypt = require("bcrypt");
// buh users-iig harah
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
exports.getHospitals = asyncHandler(async (req, res, next) => {
  // const page =parseInt(req.query.page) || 1;
  // const limit =parseInt(req.query.limit) || 10;
  // const select =req.query.select;
  // const sort =req.query.sort;

  // ['page','limit','select','sort'].forEach(el=> delete req.query[el]);

  // pagination
  // const pagination = await paginate (page, limit, User);
  const hospital = await req.db.hospital.findAll();
  res.status(200).json({
    success: true,
    data: hospital,
  });
});

// neg hereglegch ID-aar shuuj harah
exports.getHospital = asyncHandler(async (req, res, next) => {
  const hospital = await req.db.hospital.findByPk(req.params.id);
  if (!hospital) {
    throw new myError(req.params.id + `: iim ID-tai user oldsongui`, 400);
  }

  res.status(200).json({
    success: true,
    data: hospital,
  });
});

exports.createHospital = asyncHandler(async (req, res, next) => {
  if (
    !req.body.email ||
    !req.body.name ||
    !req.body.phone ||
    !req.body.password
  ) {
    throw new myError(`Мэдээлэлээ бүрэн оруулна уу`, 400);
  }

  const hospital1 = await req.db.hospital.findOne({
    where: { email: req.body.email },
  });
  console.log(hospital1);
  if (hospital1 != null) {
    throw new myError(`Уучлаарай. Бүртгэлтэй хэрэглэгч байна`, 400);
  }
  const hospital2 = await req.db.hospital.findOne({
    where: { phone: req.body.phone },
  });
  if (hospital2 != null) {
    throw new myError(`Уучлаарай. Бүртгэлтэй хэрэглэгч байна`, 400);
  }
  const hashedPass = bcrypt.hashSync(req.body.password, salt);
  const hospital = await req.db.hospital.create({
    email: req.body.email,
    name: req.body.name,
    phone: req.body.phone,
    location: req.body.location,
    password: hashedPass,
  });

  res.status(200).json({
    success: true,
    data: hospital,
  });
  // user.save();
  // res.status(200).json({
  //   success: true,
  //   data: {
  //     email: user.email,
  //     role: user.role,
  //     phone: user.phone,
  //     companyID: user.companyID,
  //   },
  // });
});

// hereglegch oorchloh
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new myError(req.params.id + `: iim ID-tai hereglegch oldsongui`, 400);
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

// hereglegch ustgah
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new myError(req.params.id + `: iim ID-tai hereglegch oldsongui`, 400);
  }

  user.remove();

  res.status(200).json({
    success: true,
    data: user,
  });
});
