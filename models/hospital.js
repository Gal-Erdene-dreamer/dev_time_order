const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "hospital",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(25),
        allowNull: true,
        unique: "phone must be unique",
        validate: {
          len: [4, 25],
        },
      },
      email: {
        type: DataTypes.STRING(45),
        allowNull: true,
        unique: "email must be unique",
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Email буруу байна",
        ],
      },
      location: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      latitude: {
        type: DataTypes.DOUBLE,
        validate: {
          min: -90,
          max: 90,
        },
      },
      longitude: {
        type: DataTypes.DOUBLE,
        validate: {
          min: -180,
          max: 180,
        },
      },
      description: {
        type: DataTypes.TEXT(),
        allowNull: true,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: "hospitals",
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
};
