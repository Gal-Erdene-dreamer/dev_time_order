const MyError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");

// GET 1 Category by id
exports.getTime = asyncHandler(async (req, res, next) => {
  const time = await req.db.time.findByPk(req.params.id);

  if (!time) {
    throw new MyError(`Алдаа!!`, 400);
  }

  res.status(200).json({
    success: true,
    time,
  });
});

// buh tsaguud harah
exports.getTimes = asyncHandler(async (req, res, next) => {
  const time = await req.db.time.findAll({
    where: { categoryID: req.body.categoryID },
  });
  res.status(200).json({
    success: true,
    time,
  });
});

// Category уудыг бараатай нь авах бараа байхгүй бол хоосон буцаана.

// exports.getCategoriesProducts = asyncHandler(async (req, res, next) => {
//   let Categories = await req.db.category.findAll({
//     where: { hospitalID: req.params.id },
//     include: {
//       model: req.db.product,
//       association: "Products",
//       required: true,
//     },
//   });

//   res.status(200).json({
//     Success: true,
//     Categories,
//   });
// });

// Create Category
exports.createTime = asyncHandler(async (req, res, next) => {
  const time = await req.db.time.create(req.body);

  res.status(200).json({
    success: true,
    message: "Амжилттай",
    time,
  });
});

// Update Category
exports.updateTime = asyncHandler(async (req, res, next) => {
  const time = await req.db.time.findByPk(req.params.id);

  if (!time) {
    throw new MyError(`Алдаа!!`, 400);
  }

  await time.update(req.body);

  res.status(200).json({
    success: true,
    message: "Амжилттай",
  });
});

// Delete Category
exports.deleteTime = asyncHandler(async (req, res, next) => {
  const time = await req.db.time.findByPk(req.params.id);

  if (!time) {
    throw new MyError(`Алдаа!!`, 400);
  }

  await time.destroy();

  res.status(200).json({
    success: true,
    message: "Амжилттай устгалаа",
  });
});
