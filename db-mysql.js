const Sequelize = require("sequelize");

var db = {};

// SCHEMA INJECT
const ssSequelize = new Sequelize(
  process.env.SEQUELIZE_SCHEMA_TIMEORDER,
  process.env.SEQUELIZE_USER,
  process.env.SEQUELIZE_USER_PASSWORD,
  {
    host: process.env.SEQUELIZE_HOST,
    port: process.env.SEQUELIZE_PORT,
    dialect: process.env.SEQUELIZE_DIALECT,
    define: {
      freezeTableName: true,
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 60000,
      idle: 15000,
    },
    operatorAliases: false,
  }
);
ssSequelize.dialect.supports.schemas = true;

const Models = [
  require("./models/hospital"),
  require("./models/customer"),
  require("./models/order"),
];

Models.forEach((model) => {
  const seqModel = model(ssSequelize, Sequelize);
  db[seqModel.name] = seqModel;
});

db.ssSequelize = ssSequelize;
// SCHEMA INJECT end

module.exports = db;
