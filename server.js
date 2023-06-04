require("dotenv").config();
const express = require("express");
var fs = require("fs");
var path = require("path");
const colors = require("colors");
const errorHandler = require("./middleware/error");
const morgan = require("morgan");
const hospitalRoutes = require("./routes/hospital");
const historyRoutes = require("./routes/history");
const orderRoutes = require("./routes/order");
const customerRoutes = require("./routes/customer");
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
const fileupload = require("express-fileupload");
const cors = require("cors");
const injectDb = require("./middleware/injectDb");

const db = require("./db-mysql");

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileupload());
app.use(injectDb(db));
app.use("/customer", customerRoutes);
app.use("/order", orderRoutes);
app.use("/history", historyRoutes);
app.use("/hospital", hospitalRoutes);
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use(errorHandler);

db.product.belongsTo(db.category, {
  foreignKey: "categoryID",
  as: "Category",
});
// db.category.hasMany(db.product, {
//   as: "Products",
//   foreignKey: "categoryID",
// });

db.orders.belongsTo(db.customer, {
  foreignKey: "customerID",
  as: "Customer",
});
db.customer.hasMany(db.orders, {
  foreignKey: "customerID",
  as: "Orders",
});

// db.orders.belongsTo(db.category, {
//   foreignKey: "categoryID",
//   as: "Category",
// });
// db.category.hasMany(db.orders, {
//   foreignKey: "categoryID",
//   as: "Orders",
// });

// db.category.belongsTo(db.hospital, {
//   foreignKey: "categoryID",
//   as: "Hospital",
// });
// db.hospital.hasMany(db.category, {
//   foreignKey: "categoryID",
//   as: "Categories",
// });

db.ssSequelize
  .sync()
  .then((result) => {
    console.log("MYSQL SCHEMA SYNC SUCCESSFUL...".blue);
  })
  .catch((err) => console.log(err));

const server = app.listen(
  process.env.PORT,
  console.log(`SERVER ${process.env.PORT} PORT ДЭЭР АСЛАА`.blue)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Алдаа: ${err.message}`.red.bold);
  server.close(() => {
    process.exit(1);
  });
});
