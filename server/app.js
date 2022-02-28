const express = require("express");
const path = require("path");
const cors = require("cors");
// var cookieParser = require('cookie-parser');
const logger = require("morgan");
const PORT = 3001;
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const { db: pool } = require("./db");

const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: [
      "e1d50c4f-538a-4682-89f4-c002f10a59c8",
      "2d310699-67d3-4b26-a3a4-1dbf2b67be5c",
    ],
  })
);

app.use(function (req, res, next) {
  res.locals.user_id = req.session.user_id;
  next();
});

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter(pool));

app.listen(PORT, () => {
  console.log(`server has been started on port ${PORT}`);
});

module.exports = app;
