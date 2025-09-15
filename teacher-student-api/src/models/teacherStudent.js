const sequelize = require("../config/db");
const Teacher = require("./teacher");
const Student = require("./student");

const TeacherStudent = sequelize.define("TeacherStudent", {}, { timestamps: false });

Teacher.belongsToMany(Student, { through: TeacherStudent });
Student.belongsToMany(Teacher, { through: TeacherStudent });

module.exports = { Teacher, Student, TeacherStudent };
