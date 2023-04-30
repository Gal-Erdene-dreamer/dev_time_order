const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "category",
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
      hospitalID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "hospital",
          key: "id",
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: "category",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "FK_category_1",
          using: "BTREE",
          fields: [{ name: "hospitalID" }],
        },
      ],
    }
  );
};
