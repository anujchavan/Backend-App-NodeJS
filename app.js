require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const usersRouter = require("./api/users/router");
const authRouter = require("./api/auth/router");
const adminRouter = require("./api/admin/router");
const app = express();
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running on PORT :", process.env.APP_PORT);
});