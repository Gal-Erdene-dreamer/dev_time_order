const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "orders",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "category",
          key: "id",
        },
      },
      customerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "customer",
          key: "id",
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: "orders",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "FK_order_1",
          using: "BTREE",
          fields: [{ name: "categoryID" }],
        },
        {
          name: "FK_order_2",
          using: "BTREE",
          fields: [{ name: "customerID" }],
        },
      ],
    }
  );
};
