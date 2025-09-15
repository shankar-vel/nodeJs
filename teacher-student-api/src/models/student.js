const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Student = sequelize.define("Student", {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true }
  },
  suspended: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Student;
