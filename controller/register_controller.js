const asyncHandler = require("../middleware/asyncHandler");
const sendEmail = require("../utils/email");
const bcrypt = require("bcrypt");
const myError = require("../utils/myError");

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
// register
exports.register = asyncHandler(async (req, res, next) => {
  // if (
  //   !req.body.email ||
  //   !req.body.name ||
  //   !req.body.phone ||
  //   !req.body.password ||
  //   !req.body.location
  // ) {
  //   throw new myError(`Мэдээлэлээ бүрэн оруулна уу`, 400);
  // }

  let user2 = await req.db.user.findOne({
    where: { email: req.body.email },
  });
  console.log(user2);
  if (user2 != null) {
    throw new myError(`Уучлаарай. Бүртгэлтэй хэрэглэгч байна`, 400);
  }
  user2 = await req.db.user.findOne({
    where: { phone: req.body.phone },
  });
  if (user2 != null) {
    throw new myError(`Уучлаарай. Бүртгэлтэй хэрэглэгч байна`, 400);
  }
  const hashedPass = bcrypt.hashSync(req.body.password, salt);
  console.log(hashedPass);
  req.body.password = hashedPass;
  const user = await req.db.user.create(req.body);
  // user.save();

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.employeeRegister = asyncHandler(async (req, res, next) => {
  let employee2 = await req.db.employee.findOne({
    where: { email: req.body.email },
  });
  console.log(employee2);
  if (employee2 != null) {
    throw new myError(`Уучлаарай. Бүртгэлтэй хэрэглэгч байна`, 400);
  }
  employee2 = await req.db.employee.findOne({
    where: { phone: req.body.phone },
  });
  if (employee2 != null) {
    throw new myError(`Уучлаарай. Бүртгэлтэй хэрэглэгч байна`, 400);
  }
  const hashedPass = bcrypt.hashSync(req.body.password, salt);
  console.log(hashedPass);
  req.body.password = hashedPass;
  const employee = await req.db.employee.create(req.body);
  // employee.save();

  res.status(200).json({
    success: true,
    data: employee,
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
