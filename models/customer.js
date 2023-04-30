const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "customer",
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
        type: DataTypes.CHAR(8),
        allowNull: false,
        unique: "phone must be unique",
      },
      voiceID: {
        type: DataTypes.TEXT(),
        allowNull: true,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: "customer",
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
