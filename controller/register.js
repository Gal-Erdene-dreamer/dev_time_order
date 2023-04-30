const asyncHandler = require("../middleware/asyncHandler");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const myError = require("../utils/myError");

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
// register
exports.register = asyncHandler(async (req, res, next) => {
  if (
    !req.body.email ||
    !req.body.name ||
    !req.body.phone ||
    !req.body.password ||
    !req.body.location
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
  console.log(hashedPass);
  const hospital = await req.db.hospital.create({
    email: req.body.email,
    name: req.body.name,
    phone: req.body.phone,
    location: req.body.location,
    password: hashedPass,
  });
  // hospital.save();

  res.status(200).json({
    success: true,
    data: hospital,
  });
});

// confirm code
// exports.confirmCode = asyncHandler(async (req,res,next)=>{

//     if(!req.body.confirmCode){
//         throw new myError(`Амжилтгүй`,400);
//     };

//     const encrypted =crypto.createHash('sha256').update(req.body.confirmCode.toString()).digest('hex');

//     const user = await req.db.user.findOne({
//         resetPasswordToken: encrypted ,
//         resetTokenExpire: { $gt : Date.now() },
//     });

//     if(!user){
//         throw new myError(`Амжилтгүй`,400);
//     };

//     res.status(200).json({
//         success: true,
//         token: user.getJsonWebToken(),
//     });

// });

// set password
// exports.setPassword = asyncHandler(async (req,res,next)=>{

//     if(!req.body.password){
//         throw new myError(`Амжилтгүй pass`,400);
//     };
//     const user = await req.db.user.findByPk(req.userId);

//     if(!user){
//         throw new myError(`Амжилтгүй token`,400);
//     };

//     const salt = await bcrypt.genSalt(10);
//     const Pass = await bcrypt.hash(req.body.password, salt);

//     await req.db.user.update({
//         Password: Pass,
//         resetPasswordToken: null,
//         resetTokenExpire: null
//         },
//         {
//         where: {ID : user.ID}
//         }
//     );

//     res.status(200).json({
//         success: true,
//         message: "Амжилттай"
//     });
// });
