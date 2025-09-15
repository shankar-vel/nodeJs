const express = require("express");
const router = express.Router();
const controller = require("../controllers/teacherController");

router.post("/register", controller.registerStudents);
router.get("/commonstudents", controller.getCommonStudents);
router.post("/suspend", controller.suspendStudent);
router.post("/retrievefornotifications", controller.retrieveForNotifications);

module.exports = router;
