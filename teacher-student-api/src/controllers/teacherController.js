const { Teacher, Student } = require("../models/teacherStudent");
const errorHandler = require("../utils/errorHandler");
const { Op } = require("sequelize");

// 1. Register students
exports.registerStudents = async (req, res) => {
  try {
    const { teacher, students } = req.body;
    if (!teacher || !students || !students.length) {
      return errorHandler(res, 400, "Teacher and students are required");
    }

    const [teacherRecord] = await Teacher.findOrCreate({ where: { email: teacher } });

    for (let s of students) {
      const [studentRecord] = await Student.findOrCreate({ where: { email: s } });
      await teacherRecord.addStudent(studentRecord);
    }

    return res.status(204).send();
  } catch (err) {
    return errorHandler(res, 500, err.message);
  }
};

// 2. Get common students
exports.getCommonStudents = async (req, res) => {
  try {
    let teachers = req.query.teacher;
    if (!teachers) return errorHandler(res, 400, "Teacher email(s) required");
    if (!Array.isArray(teachers)) teachers = [teachers];

    const teacherRecords = await Teacher.findAll({
      where: { email: teachers },
      include: Student
    });

    if (teacherRecords.length !== teachers.length) {
      return errorHandler(res, 404, "One or more teachers not found");
    }

    let commonStudents = teacherRecords[0].Students.map(s => s.email);
    for (let t of teacherRecords.slice(1)) {
      commonStudents = commonStudents.filter(email =>
        t.Students.map(s => s.email).includes(email)
      );
    }

    return res.status(200).json({ students: commonStudents });
  } catch (err) {
    return errorHandler(res, 500, err.message);
  }
};

// 3. Suspend student
exports.suspendStudent = async (req, res) => {
  try {
    const { student } = req.body;
    if (!student) return errorHandler(res, 400, "Student email required");

    const studentRecord = await Student.findOne({ where: { email: student } });
    if (!studentRecord) return errorHandler(res, 404, "Student not found");

    studentRecord.suspended = true;
    await studentRecord.save();

    return res.status(204).send();
  } catch (err) {
    return errorHandler(res, 500, err.message);
  }
};

// 4. Retrieve notification recipients
exports.retrieveForNotifications = async (req, res) => {
  try {
    const { teacher, notification } = req.body;
    if (!teacher || !notification) {
      return errorHandler(res, 400, "Teacher and notification are required");
    }

    const teacherRecord = await Teacher.findOne({
      where: { email: teacher },
      include: { model: Student, where: { suspended: false }, required: false }
    });

    if (!teacherRecord) return errorHandler(res, 404, "Teacher not found");

    let recipients = teacherRecord.Students.map(s => s.email);

    // Extract mentioned students
    const mentioned = notification.match(/@[^\s]+/g) || [];
    const mentionedEmails = mentioned.map(m => m.substring(1));

    const validMentioned = await Student.findAll({
      where: {
        email: mentionedEmails,
        suspended: false
      }
    });

    recipients = [...new Set([...recipients, ...validMentioned.map(s => s.email)])];

    return res.status(200).json({ recipients });
  } catch (err) {
    return errorHandler(res, 500, err.message);
  }
};
