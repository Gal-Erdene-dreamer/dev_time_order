const MyError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");

// GET 1 history by id
exports.getHistory = asyncHandler(async (req, res, next) => {
  const history = await req.db.history.findByPk(req.params.id);

  if (!history) {
    throw new MyError(`Алдаа!!`, 400);
  }

  res.status(200).json({
    success: true,
    history,
  });
});

// buh history harah
exports.getHistories = asyncHandler(async (req, res, next) => {
  const history = await req.db.history.findAll();
  res.status(200).json({
    Success: true,
    history,
  });
});

// Create history
exports.createHistory = asyncHandler(async (req, res, next) => {
  //   if (!req.body.name) {
  //     throw new MyError(`Мэдээлэлээ бүрэн оруулна уу`, 400);
  //   }
  const history = await req.db.history.create(req.body);

  res.status(200).json({
    success: true,
    history,
  });
});

// Update history
exports.updateHistory = asyncHandler(async (req, res, next) => {
  const history = await req.db.history.findByPk(req.params.id);

  if (!history) {
    throw new MyError(`Алдаа!!`, 400);
  }

  await history.update(req.body);

  res.status(200).json({
    success: true,
    history,
  });
});

// Delete history
exports.deletehistory = asyncHandler(async (req, res, next) => {
  const history = await req.db.history.findByPk(req.params.id);

  if (!history) {
    throw new MyError(`Алдаа!!`, 400);
  }

  await history.destroy();

  res.status(200).json({
    success: true,
    history,
  });
});
