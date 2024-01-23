const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const moment = require("moment");
const es = require("moment/locale/es");
const momentTz = require("moment-timezone");

const inventoryRoutes = require("./routes/inventory.routes");
const requirementRoutes = require("./routes/requirement.routes");
const slicedRoutes = require("./routes/sliced.routes");
const capacityRoutes = require("./routes/capacity.routes");
const productionRoutes = require("./routes/production.routes");

const app = express();
moment.updateLocale("es", es);
momentTz.tz.setDefault("America/Mexico_City");

// Settings
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(fileUpload());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client/dist")));

// Routes
app.use("/api/inventario", inventoryRoutes);
app.use("/api/requerimiento", requirementRoutes);
app.use("/api/rebanado", slicedRoutes);
app.use("/api/capacidad", capacityRoutes);
app.use("/api/produccion", productionRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

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
