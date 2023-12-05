const MyError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");
const sequelize = require("sequelize");

exports.getOrders = asyncHandler(async (req, res, next) => {
  console.log(req.query)
  const orders = await req.db.order
    .scope({ method: ["filter_by_status", req.query.status] })
    .findAll({
      include: ["user", "driver"],
      // include: [
      //   {
      //     model: req.db.user,
      //     association: "user",
      //     required: true,
      //     // attributes: ["name", "phone"],
      //   },
      // ],
    });
  res.status(200).json({
    success: true,
    orders,
  });
});

exports.createOrder = asyncHandler(async (req, res, next) => {
  const drivers = await req.db.employee.findAll({
    where: {
      role: "driver",
      status: "active",
    },
    attributes: ["id", "latitude", "longitude"],
  });

  const customerLatitude = req.body.customer_latitude;
  const customerLongitude = req.body.customer_longitude;

  console.log(drivers, customerLatitude, customerLongitude);

  drivers.forEach((driver) => {
    driver.distance = driver.haversineDistanceBetweenPoints(
      driver.latitude,
      driver.longitude,
      customerLatitude,
      customerLongitude
    );
  });

  drivers.sort((a, b) => a.distance - b.distance);

  req.body.driver_id = drivers[0].id;

  const order = await req.db.order.create(req.body);
  await drivers[0].update({ status: "going" });

  res.status(200).json({
    success: true,
    order,
  });
});

exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await req.db.order.findByPk(req.params.id, {
    include: ["user", "driver"],
  });

  if (!order) {
    throw new MyError(`Not found`, 404);
  }

  res.status(200).json({
    success: true,
    order,
  });
});

exports.getLocation = asyncHandler(async (req, res, next) => {
  const order = await req.db.order.findByPk(req.params.id, {
    attributes: ["customer_latitude", "customer_longitude"],
    include: [{ association: "driver", attributes: ["latitude", "longitude"] }],
  });

  if (!order) {
    throw new MyError(`Not found`, 404);
  }

  res.status(200).json({
    success: true,
    order,
  });
});

exports.updateOrder = asyncHandler(async (req, res, next) => {
  const order = await req.db.order.findByPk(req.params.id);

  if (!order) {
    throw new MyError(`Not found`, 404);
  }

  await order.update(req.body);

  res.status(200).json({
    success: true,
    message: order,
  });
});

exports.updateLocation = asyncHandler(async (req, res, next) => {
  const order = await req.db.order.findByPk(req.params.id, {
    include: ["driver", "user"],
  });

  if (!order) {
    throw new MyError(`Not found`, 404);
  }

  order.driver.latitude = req.body.latitude;
  order.driver.longitude = req.body.longitude;
  order.customer_latitude = req.body.customer_latitude;
  order.customer_longitude = req.body.customer_longitude;

  await order.driver.save();
  await order.save();
  await order.reload();

  res.status(200).json({
    success: true,
    message: order,
  });
});

exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await req.db.order.findByPk(req.params.id);

  if (!order) {
    throw new MyError(`Not found`, 404);
  }

  await order.destroy();

  res.status(200).json({
    success: true,
    message: "Амжилттай устгалаа",
  });
});
