const request = require("supertest");
const app = require("../src/app");
const sequelize = require("../src/config/db");
const { Teacher, Student } = require("../src/models/teacherStudent");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Teacher API", () => {
  test("POST /api/register", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({
        teacher: "teacherken@gmail.com",
        students: ["studentjon@gmail.com"]
      });
    expect(res.statusCode).toBe(204);
  });

  test("GET /api/commonstudents", async () => {
    const res = await request(app).get("/api/commonstudents?teacher=teacherken@gmail.com");
    expect(res.statusCode).toBe(200);
    expect(res.body.students).toContain("studentjon@gmail.com");
  });

  test("POST /api/suspend", async () => {
    const res = await request(app)
      .post("/api/suspend")
      .send({ student: "studentjon@gmail.com" });
    expect(res.statusCode).toBe(204);
  });

  test("POST /api/retrievefornotifications", async () => {
    await Student.create({ email: "studentmary@gmail.com" });
    const res = await request(app)
      .post("/api/retrievefornotifications")
      .send({
        teacher: "teacherken@gmail.com",
        notification: "Hello @studentmary@gmail.com"
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.recipients).toContain("studentmary@gmail.com");
  });
});
