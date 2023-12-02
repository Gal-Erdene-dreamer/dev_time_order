const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");

exports.auth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).json({ success: false, message: "invalid token" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.current_user = payload;
    // req.current_user = {
    //   id: payload.id,
    //   phone: payload.phone,
    //   email: payload.email,
    //   name: payload.name,
    // };
    next();
  } catch {
    res.status(401).json({ success: false, message: "invalid token" });
  }
});
