const MyError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");

exports.getOrders = asyncHandler(async (req, res, next) => {
  let orders = await req.db.orders.findAll({
    include: [
      {
        model: req.db.customer,
        association: "Customer",
        required: true,
        attributes: ["name", "phone"],
      },
    ],
  });
  if (!orders) {
    throw new MyError("Захиалга байхгүй байна", 404);
  }

  const date = new Date();
  let days = date.toISOString().slice(0, 10);
  orders.forEach((el) => {
    switch (el.order_time) {
      case 1:
        el.dataValues.start_time = days + " 13:00:00";
        el.dataValues.end_time = days + " 14:00:00";
        break;
      case 2:
        el.dataValues.start_time = days + " 15:00:00";
        el.dataValues.end_time = days + " 16:00:00";
        break;
      default:
        el.dataValues.start_time = days + " 13:00:00";
        el.dataValues.end_time = days + " 14:00:00";
    }
  });

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.createOrder = asyncHandler(async (req, res, next) => {
  const order = await req.db.orders.create(req.body);
  res.status(200).json({
    success: true,
    order,
  });
});

exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await req.db.orders.findByPk(req.params.id);

  if (!order) {
    throw new MyError(` Хэрэглэгч олдсонгүй`, 400);
  }

  await order.destroy();

  res.status(200).json({
    success: true,
    message: "Амжилттай устгалаа",
  });
});
