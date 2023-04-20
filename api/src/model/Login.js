const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("Usuarios", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  birthDate: {
    type: DataTypes.DATEONLY,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    required: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  rol: {
    type: DataTypes.ENUM(["normal", "admin"]),
    defaultValue: "normal",
  },
});
module.exports = User;
