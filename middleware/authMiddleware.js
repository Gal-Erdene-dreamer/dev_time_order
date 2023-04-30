const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");

exports.auth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.send(401).json({ success: false });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.hospital = {
      id: payload.id,
      phone: payload.phone,
      email: payload.email,
      name: payload.name,
    };
    next();
  } catch {
    res.sendStatus(401).json({ message: "invalid token" });
  }
});
