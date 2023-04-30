const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = function (sequelize, DataTypes) {
  const hospital = sequelize.define(
    "hospital",
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
        type: DataTypes.CHAR(8),
        allowNull: false,
        unique: "phone must be unique",
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
      tableName: "hospital",
      timestamps: false,
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

  hospital.prototype.generatePasswordChangePin = function () {
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

  hospital.prototype.getJsonWebToken = function () {
    const token = jwt.sign(
      {
        id: this.id,
        email: this.email,
        name: this.name,
        phone: this.phone,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRESIN }
    );
    return token;
  };

  hospital.prototype.checkPassword = async function (enteredPassword) {
    return await bcrypt.compareSync(enteredPassword, this.password);
  };
  return hospital;
};
