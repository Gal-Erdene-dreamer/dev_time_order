const MyError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");
// const paginate = require("../utils/paginateSequelize");

exports.getCustomers = asyncHandler(async (req, res, next) => {
  const customer = await req.db.customer.findAll();

  if (!customer) {
    throw new MyError(` Хэрэглэгч олдсонгүй`, 400);
  }

  res.status(200).json({
    success: true,
    data: customer,
  });
});

// GET 1 Product by id
exports.getCustomer = asyncHandler(async (req, res, next) => {
  const customer = await req.db.customer.findByPk(req.params.id);

  if (!customer) {
    throw new MyError(` Бараа олдсонгүй`, 400);
  }

  res.status(200).json({
    success: true,
    data: customer,
  });
});

// Create product
exports.createCustomer = asyncHandler(async (req, res, next) => {
  await req.db.customer.create(req.body);

  res.status(200).json({
    success: true,
    message: "Амжилттай",
  });
});

// Update Product
exports.updateCustomer = asyncHandler(async (req, res, next) => {
  const customer = await req.db.customer.findByPk(req.params.id);

  if (!customer) {
    throw new MyError(` Хэрэглэгч олдсонгүй`, 400);
  }

  await customer.update(req.body);

  res.status(200).json({
    success: true,
    message: "Амжилттай",
  });
});

// Бараа Устгах
exports.deleteCustomer = asyncHandler(async (req, res, next) => {
  const customer = await req.db.customer.findByPk(req.params.id);

  if (!customer) {
    throw new MyError(` Хэрэглэгч олдсонгүй`, 400);
  }

  await customer.destroy();

  res.status(200).json({
    success: true,
    message: "Амжилттай устгалаа",
  });
});
