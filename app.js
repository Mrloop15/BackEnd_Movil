var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/ejemplo6b");

//lista de modelos
require("./model/sensores");
require("./model/empleado");

//listado de archivos de rutas
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var empleadosRouter = require("./routes/empleados");
var sensorRouter = require("./routes/sensor");
var empleadoRouter = require("./routes/empleado");
const router = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//la url física que tiene cada archivo de rutas
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/empleados", empleadosRouter);
app.use("/sensor", sensorRouter);
app.use("/empleado", empleadoRouter);
//app.use("/empleado", empleadoRouter.empleado);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
