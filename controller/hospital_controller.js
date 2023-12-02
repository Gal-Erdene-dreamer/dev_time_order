const MyError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");

exports.getHospitals = asyncHandler(async (req, res, next) => {
  const hospitals = await req.db.hospital.findAll();
  res.status(200).json({
    success: true,
    data: hospitals,
  });
});

// neg hereglegch ID-aar shuuj harah
exports.getHospital = asyncHandler(async (req, res, next) => {
  const hospital = await req.db.hospital.findByPk(req.params.id);
  if (!hospital) {
    throw new MyError(`hospital with id ${req.params.id} not found`, 404);
  }

  res.status(200).json({
    success: true,
    data: hospital,
  });
});

exports.createHospital = asyncHandler(async (req, res, next) => {
  const hospital3 = await req.db.hospital.findOne({
    where: { email: req.body.email },
  });
  console.log(hospital3);
  if (hospital3 != null) {
    throw new MyError(`Уучлаарай. Бүртгэлтэй хэрэглэгч байна`, 400);
  }
  const hospital2 = await req.db.hospital.findOne({
    where: { phone: req.body.phone },
  });
  if (hospital2 != null) {
    throw new MyError(`Уучлаарай. Бүртгэлтэй хэрэглэгч байна`, 400);
  }
  const hospital = await req.db.hospital.create(req.body);

  res.status(200).json({
    success: true,
    data: hospital,
  });
});

// hereglegch oorchloh
exports.updateHospital = asyncHandler(async (req, res, next) => {
  const hospital = await req.db.hospital.findByPk(req.params.id);

  if (!hospital) {
    throw new MyError(`hospital with id ${req.params.id} not found`, 404);
  }

  await hospital.update(req.body);
  res.status(200).json({
    success: true,
    data: hospital,
  });
});

// hereglegch ustgah
exports.deleteHospital = asyncHandler(async (req, res, next) => {
  const hospital = await req.db.hospital.findByPk(req.params.id);

  if (!hospital) {
    throw new MyError(`Алдаа!!`, 400);
  }

  await hospital.destroy();

  res.status(200).json({
    success: true,
    data: hospital,
  });
});
