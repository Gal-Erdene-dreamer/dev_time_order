const Sequelize = require("sequelize");

const mysql = require("mysql2");

// Open the connection to MySQL server
const connection = mysql.createConnection({
  host: process.env.SEQUELIZE_HOST,
  port: process.env.SEQUELIZE_PORT,
  user: process.env.SEQUELIZE_USER,
  password: process.env.SEQUELIZE_USER_PASSWORD,
});

// Run create database statement
connection.query(
  `CREATE DATABASE IF NOT EXISTS ${process.env.SEQUELIZE_SCHEMA_TIMEORDER}`,
  function (err, results) {
    console.log(results);
    console.log(err);
  }
);
// Close the connection
connection.end();

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
  require("./models/user"),
  require("./models/employee"),
  require("./models/hospital"),
  require("./models/order"),
  // require("./models/history"),
];

Models.forEach((model) => {
  const seqModel = model(ssSequelize, Sequelize);
  db[seqModel.name] = seqModel;
});

db.ssSequelize = ssSequelize;
// SCHEMA INJECT end

module.exports = db;
