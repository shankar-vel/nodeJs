const express = require("express");
const app = express();
const routes = require("./routes/teacherRoutes");

app.use(express.json());
app.use("/api", routes);

module.exports = app;
