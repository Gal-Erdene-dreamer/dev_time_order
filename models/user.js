const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = function (sequelize, DataTypes) {
  const user = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: "phone must be unique",
        validate: {
          len: [4, 25],
        },
      },
      status: {
        type: Sequelize.ENUM,
        values: ["active", "inactive"],
        allowNull: false,
        defaultValue: "active",
      },
      role: {
        type: Sequelize.ENUM,
        values: ["superadmin", "customer"],
        defaultValue: "customer",
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: "email must be unique",
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Email буруу байна",
        ],
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT(),
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
  // Static method

  // Instance method

  user.prototype.generatePasswordChangePin = function () {
    const resetPin = Math.floor(
      Math.random() * (999999 - 100000 + 1) + 100000
    ).toString();

    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetPin)
      .digest("hex");

    this.resetTokenExpire = Date.now() + 1800000;

    return resetPin;
  };

  user.prototype.getJsonWebToken = function () {
    const token = jwt.sign(this.toJSON(), process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRESIN,
    });
    return token;
  };

  user.prototype.checkPassword = async function (enteredPassword) {
    return bcrypt.compareSync(enteredPassword, this.password);
  };
  return user;
};
