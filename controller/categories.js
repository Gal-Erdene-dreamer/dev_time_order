const MyError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");

// GET 1 Category by id
exports.getCategory = asyncHandler(async (req, res, next) => {
  const Category = await req.db.category.findByPk(req.params.id);

  if (!Category) {
    throw new MyError(`Алдаа!!`, 400);
  }

  res.status(200).json({
    success: true,
    Category,
  });
});

// buh category harah
exports.getAllCategories = asyncHandler(async (req, res, next) => {
  const Categories = await req.db.category.findAll({
    where: { hospitalID: req.hospital.id },
  });
  res.status(200).json({
    Success: true,
    Categories,
  });
});

// Category уудыг бараатай нь авах бараа байхгүй бол хоосон буцаана.

exports.getCategoriesProducts = asyncHandler(async (req, res, next) => {
  let Categories = await req.db.category.findAll({
    where: { hospitalID: req.params.id },
    include: {
      model: req.db.product,
      association: "Products",
      required: true,
    },
  });

  res.status(200).json({
    Success: true,
    Categories,
  });
});

// Create Category
exports.createCategory = asyncHandler(async (req, res, next) => {
  if (!req.body.name) {
    throw new MyError(`Мэдээлэлээ бүрэн оруулна уу`, 400);
  }
  req.body.hospitalID = req.hospital.id;
  const category = await req.db.category.create(req.body);

  res.status(200).json({
    success: true,
    message: "Амжилттай",
    category,
  });
});

// Update Category
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const category = await req.db.category.findByPk(req.params.id);

  if (!category) {
    throw new MyError(`Алдаа!!`, 400);
  }

  await category.update(req.body);

  res.status(200).json({
    success: true,
    message: "Амжилттай",
  });
});

// Delete Category
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await req.db.category.findByPk(req.params.id);

  if (!category) {
    throw new MyError(`Алдаа!!`, 400);
  }

  await category.destroy();

  res.status(200).json({
    success: true,
    message: "Амжилттай устгалаа",
  });
});
