const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const es = require("moment/locale/es");
const moment = require("moment");
const momentTz = require("moment-timezone");

const inventoryRoutes = require("./routes/inventory.routes");
const requirementsRoutes = require("./routes/requirements.routes");

const app = express();
const port = process.env.PORT || 3001;
moment.updateLocale("es", es);
momentTz.tz.setDefault("America/Mexico_City");

// Settings
app.set("port", port);
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client/dist")));

// Routes
app.use("/api/inventario", inventoryRoutes);
app.use("/api/requerimiento", requirementsRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

module.exports = app;
